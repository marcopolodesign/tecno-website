import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { supabase } from '../lib/supabase'

const ContactSidecart = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    trainingGoal: '',
    notes: ''
  })
  const [prospectId, setProspectId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [utmParams, setUtmParams] = useState({
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: ''
  })

  const sidecartRef = useRef(null)
  const backdropRef = useRef(null)

  // GSAP Animation
  useEffect(() => {
    if (isOpen) {
      // Animate in
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.fromTo(
        sidecartRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )
    } else {
      // Animate out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      gsap.to(sidecartRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      })
    }
  }, [isOpen])

  // Capture UTM parameters from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utm = {
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmTerm: urlParams.get('utm_term') || '',
      utmContent: urlParams.get('utm_content') || ''
    }
    setUtmParams(utm)
    
    // Also save to localStorage for persistence
    if (Object.values(utm).some(v => v)) {
      localStorage.setItem('utmParams', JSON.stringify(utm))
    } else {
      // Try to load from localStorage if not in URL
      const savedUtm = localStorage.getItem('utmParams')
      if (savedUtm) {
        setUtmParams(JSON.parse(savedUtm))
      }
    }
  }, [])

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    const savedProspectId = localStorage.getItem('prospectId')
    
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    if (savedProspectId && savedProspectId !== 'undefined' && savedProspectId !== 'null') {
      setProspectId(savedProspectId)
    }
  }, [])

  // Validate email (más estricto)
  const isValidEmail = (email) => {
    // Validar que tenga un dominio válido (mínimo 2 caracteres después del punto)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email)
  }

  // Create Prospect
  const createProspect = async (data) => {
    try {
      const prospectData = {
        first_name: data.firstName || '',
        last_name: data.lastName || '',
        email: data.email,
        phone: data.phone || '',
        message: data.notes || '',
        converted_to_lead: false,
        utm_source: utmParams.utmSource || null,
        utm_medium: utmParams.utmMedium || null,
        utm_campaign: utmParams.utmCampaign || null,
        utm_term: utmParams.utmTerm || null,
        utm_content: utmParams.utmContent || null
      }

      // Only include training_goal if it has a value
      if (data.trainingGoal) {
        prospectData.training_goal = data.trainingGoal
      }

      const { data: result, error } = await supabase
        .from('prospects')
        .insert([prospectData])
        .select()
        .single()

      if (error) {
        console.error('Error creating prospect:', error)
        return null
      }

      const newProspectId = result.id
      setProspectId(newProspectId)
      localStorage.setItem('prospectId', newProspectId)
      console.log('✅ Prospect created:', newProspectId)

      // Log the prospect creation
      try {
        await supabase.from('logs').insert([{
          action_type: 'prospect_created',
          action_description: `Nuevo prospecto desde formulario web: ${data.firstName || ''} ${data.lastName || ''}`.trim(),
          performed_by_type: 'system',
          performed_by_name: 'Sistema Automático',
          entity_type: 'prospect',
          entity_id: result.id,
          entity_name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.email,
          changes: {
            email: data.email,
            phone: data.phone,
            training_goal: data.trainingGoal,
            utm_source: utmParams.utmSource,
            utm_medium: utmParams.utmMedium,
            utm_campaign: utmParams.utmCampaign
          },
          metadata: {
            source: 'website_form',
            timestamp: new Date().toISOString()
          }
        }])
      } catch (logError) {
        console.error('Error logging prospect creation:', logError)
        // Don't throw - logging should never break the main flow
      }

      return newProspectId
    } catch (error) {
      console.error('Error creating prospect:', error)
    }
    return null
  }

  // Update Prospect
  const updateProspect = async (prospectId, data) => {
    try {
      const updateData = {
        first_name: data.firstName || '',
        last_name: data.lastName || '',
        phone: data.phone || '',
        notes: data.notes || '',
        updated_at: new Date().toISOString()
      }

      // Include email if it's valid (allow email correction)
      if (data.email && isValidEmail(data.email)) {
        updateData.email = data.email
      }

      // Only include training_goal if it has a value
      if (data.trainingGoal) {
        updateData.training_goal = data.trainingGoal
      }

      const { error } = await supabase
        .from('prospects')
        .update(updateData)
        .eq('id', prospectId)

      if (error) {
        console.error('Error updating prospect:', error)
        
        // Si el error es por email duplicado, informar al usuario
        if (error.message?.includes('email')) {
          console.warn('⚠️ Email ya existe, creando nuevo prospect...')
          // Intentar crear un nuevo prospect
          return await createProspect(data)
        }
        throw error
      }
      
      console.log('✅ Prospect updated:', prospectId)
    } catch (error) {
      console.error('Error updating prospect:', error)
    }
  }

  // Create Lead
  const createLead = async (data) => {
    try {
      const leadData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        training_goal: data.trainingGoal,
        notes: data.notes || '',
        status: 'new',
        submitted_at: new Date().toISOString(),
        converted_to_user: false,
        prospect_id: prospectId ?? null,
        utm_source: utmParams.utmSource || null,
        utm_medium: utmParams.utmMedium || null,
        utm_campaign: utmParams.utmCampaign || null,
        utm_term: utmParams.utmTerm || null,
        utm_content: utmParams.utmContent || null
      }

      const { data: result, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single()

      if (error) {
        console.error('Error creating lead:', error)
        return false
      }

      const newLeadId = result.id
      console.log('✅ Lead created:', newLeadId)

      // Update prospect if exists
      if (prospectId) {
        await supabase
          .from('prospects')
          .update({ converted_to_lead: true })
          .eq('id', prospectId)
      }

      // Send welcome email (don't wait for it to complete)
      sendWelcomeEmail(newLeadId).catch(emailError => {
        console.error('Error sending welcome email:', emailError)
        // Don't fail the form submission if email fails
      })

      return true
    } catch (error) {
      console.error('Error creating lead:', error)
    }
    return false
  }

  // Send welcome email using Edge Function
  const sendWelcomeEmail = async (leadId) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: { leadId }
      })

      if (error) {
        throw error
      }

      console.log('✅ Welcome email sent successfully:', data)
      return data
    } catch (error) {
      console.error('Error sending welcome email:', error)
      throw error
    }
  }

  // Handle email blur (trigger prospect creation or update)
  const handleEmailBlur = async (e) => {
    const email = e.target.value
    
    // Clear previous error
    setEmailError('')
    
    if (!email) {
      return // Empty email, don't validate yet
    }
    
    if (!isValidEmail(email)) {
      setEmailError('Por favor ingresa un email válido (ej: usuario@ejemplo.com)')
      console.warn('⚠️ Email inválido:', email)
      return
    }

    if (!prospectId) {
      // Create prospect when email is valid and doesn't exist yet
      const newProspectId = await createProspect({ ...formData, email })
      if (newProspectId) {
        console.log('✅ Prospect created on email blur:', newProspectId)
      }
    } else {
      // Update prospect if email changed
      await updateProspect(prospectId, { ...formData, email })
    }
  }

  // Handle field blur (update prospect)
  const handleFieldBlur = async (field, value) => {
    if (prospectId) {
      const updatedData = { ...formData, [field]: value }
      await updateProspect(prospectId, updatedData)
    }
  }

  // Handle field change
  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      // Save to localStorage immediately
      localStorage.setItem('contactFormData', JSON.stringify(newData))
      return newData
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.phone || !formData.trainingGoal) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    setIsSubmitting(true)

    const success = await createLead(formData)
    
    if (success) {
      setSubmitSuccess(true)
      
      // Clear form and localStorage
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          trainingGoal: '',
          notes: ''
        })
        setProspectId(null)
        localStorage.removeItem('contactFormData')
        localStorage.removeItem('prospectId')
        setSubmitSuccess(false)
        onClose()
      }, 2000)
    } else {
      alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.')
    }

    setIsSubmitting(false)
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-white/70 backdrop-blur-sm z-[100] opacity-0"
        onClick={handleClose}
      />

      {/* Sidecart */}
      <div
        ref={sidecartRef}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-[#edeaea] z-[101] flex flex-col translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#edeaea]">
          <h2 className="text-2xl font-bold text-gray-900">Contactanos</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Gracias por contactarnos!</h3>
              <p className="text-gray-600">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Tu apellido"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    emailError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-red-500'
                  }`}
                  placeholder="tu@email.com"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="+54 9 11 2297-7747"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo de entrenamiento *
                </label>
                <select
                  required
                  value={formData.trainingGoal}
                  onChange={(e) => handleFieldChange('trainingGoal', e.target.value)}
                  onBlur={(e) => handleFieldBlur('trainingGoal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="weight_loss">Pérdida de peso</option>
                  <option value="muscle_gain">Aumento de masa muscular</option>
                  <option value="general_fitness">Fitness general / Tonificación</option>
                  <option value="sports_performance">Rendimiento deportivo</option>
                  <option value="rehabilitation">Rehabilitación física</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  onBlur={(e) => handleFieldBlur('notes', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos más sobre tus objetivos..."
                />
              </div>
            </form>
          )}
        </div>

        {/* Fixed Actions at Bottom */}
        {!submitSuccess && (
          <div className="border-t border-[#edeaea] bg-white p-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default ContactSidecart

