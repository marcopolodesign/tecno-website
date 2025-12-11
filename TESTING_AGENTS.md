# 🤖 TecnoFit Testing Agents

Automated QA testing agents for the TecnoFit platform using Cursor AI.

## What Are Testing Agents?

These are AI agents configured in Cursor that can automatically test your admin panel and website by:
- Navigating through pages
- Filling out forms
- Clicking buttons
- Verifying data in Supabase
- Reporting issues and bugs

## Available Agents

### 1. 🚀 Pre-Deployment Testing Agent (AUTOMATIC)
**Location:** `.cursor/agents/pre-deploy-test.md`

**Activates automatically when you say:**
- "Ready to deploy"
- "Push to production"
- "Commit and push"
- "Test before deploy"

**What it does:**
- Detects what files changed
- Runs tests on localhost FIRST
- Checks code quality
- Generates pre-deployment report
- ✅ APPROVES or 🛑 BLOCKS deployment
- Only allows push if ALL tests pass

**Workflow:**
```
You: "Ready to deploy the sellers page"
  ↓
Agent: Detects changes in admin files
  ↓
Agent: Starts local server (if not running)
  ↓
Agent: Runs all relevant tests
  ↓
Agent: Checks code quality
  ↓
Agent: Generates report
  ↓
If 100% pass → ✅ Commits and pushes
If any fail → 🛑 Blocks and lists issues
```

### 2. 🔐 Admin Panel Testing Agent (MANUAL)
**Location:** `.cursor/agents/test-admin.md`

**What it tests:**
- Authentication (admin and coach login)
- All page navigation (Dashboard, Prospects, Leads, Users, Sellers, Coaches)
- CRUD operations (Create, Read, Update, Delete)
- Sellers management
- Coaches management
- Data integrity with Supabase
- UI/UX and responsiveness

**Test credentials:**
- Admin: `admin@tecnofit.com` / `Admin123!`
- Coach: `carlos.coach@tecnofit.com` / `Coach123!`

### 3. 🌐 Website Testing Agent (MANUAL)
**Location:** `.cursor/agents/test-website.md`

**What it tests:**
- Contact form functionality
- Form validation
- Data submission to Supabase
- UTM parameter tracking
- LocalStorage persistence
- Mobile responsiveness
- Error handling

## How to Use Testing Agents

### Method 1: Using Cursor Chat (Recommended)

1. **Open Cursor** in your project
2. **Open the Chat panel** (Cmd/Ctrl + L)
3. **Tag the agent** by typing `@` and selecting the agent:
   - `@test-admin` for admin panel testing
   - `@test-website` for website testing
4. **Give instructions**, for example:
   ```
   @test-admin Please test the admin panel at https://tecno-admin.vercel.app
   ```
   or
   ```
   @test-website Test the contact form on https://somostecnofit.com
   ```
5. **Watch the agent work** - it will use browser tools to navigate and test
6. **Review the report** - the agent will provide a detailed test report

### Method 2: Using Cursor Composer

1. **Open Composer** (Cmd/Ctrl + I)
2. **Reference the agent file**:
   ```
   Using .cursor/agents/test-admin.md, test the admin panel
   ```
3. **The agent will execute the test plan**

### Method 3: Quick Commands

You can also just ask in chat:
- "Test the admin panel"
- "Test the website form"
- "Run QA tests on the sellers page"
- "Verify the coaches CRUD operations work"

## Example Test Sessions

### Testing Admin Login
```
You: @test-admin Test login functionality with both admin and coach credentials

Agent: 
🧪 Testing admin login...
✅ Navigated to https://tecno-admin.vercel.app
✅ Login form visible
✅ Filled credentials: admin@tecnofit.com
✅ Clicked login button
✅ Redirected to /dashboard
✅ Admin login successful

🧪 Testing coach login...
✅ Logged out
✅ Filled credentials: carlos.coach@tecnofit.com
✅ Clicked login button
✅ Redirected to /dashboard
✅ Coach login successful

📊 RESULT: Both login tests PASSED
```

### Testing Website Form
```
You: @test-website Test the contact form and verify data reaches Supabase

Agent:
🧪 Testing contact form...
✅ Navigated to https://somostecnofit.com
✅ Opened contact form sidecart
✅ Filled form with test data
✅ Submitted form
✅ Success message displayed
✅ Form closed

🧪 Verifying in Supabase...
✅ Navigated to admin panel
✅ Found prospect in database
✅ All fields match submitted data
✅ UTM parameters captured

📊 RESULT: Form submission test PASSED
```

## Test Reports

After each test session, the agent will provide a report like:

```
═══════════════════════════════════════════════════════
                   TEST RESULTS                        
═══════════════════════════════════════════════════════

✅ PASSED: 12
   ✓ Login as admin
   ✓ Login as coach
   ✓ Navigate to Dashboard
   ✓ Navigate to Prospects
   ✓ Navigate to Leads
   ✓ Navigate to Users
   ✓ Navigate to Sellers
   ✓ Navigate to Coaches
   ✓ Create Seller
   ✓ Create Coach
   ✓ Logout
   ✓ Form submission

❌ FAILED: 1
   ✗ Edit Coach: Modal did not open

⚠️  WARNINGS: 1
   ⚠ Slow API response on Leads page (3.2s)

───────────────────────────────────────────────────────
TOTAL TESTS: 13
PASS RATE: 92.3%
═══════════════════════════════════════════════════════
```

## Customizing Test Plans

You can modify the test plans by editing the agent files:
- `.cursor/agents/test-admin.md` - Admin panel tests
- `.cursor/agents/test-website.md` - Website tests

Add or remove test cases as needed for your specific requirements.

## Best Practices

1. **Run tests after deployments** to catch regressions
2. **Test on both production and staging** environments
3. **Use unique timestamps** in test data emails to avoid conflicts
4. **Clean up test data** after testing (delete test sellers/coaches)
5. **Report issues immediately** if tests fail
6. **Re-run failed tests** to confirm they're not flaky

## Troubleshooting

### Agent doesn't respond
- Make sure you're using `@` to tag the agent
- Check that the agent file exists in `.cursor/agents/`
- Try restarting Cursor

### Tests fail with "Element not found"
- The UI might have changed - update the agent's selectors
- The page might be loading slowly - increase wait times
- Check browser console for errors

### Can't access production URLs
- Ensure you have internet connection
- Check if the site is actually deployed
- Verify URLs are correct in the agent file

## Automated Testing Workflow

### Pre-Deployment Testing (Cursor Agent)

The **Pre-Deployment Agent** automatically activates when you're ready to deploy:

**Example 1: Deploying Admin Changes**
```
You: "I've finished the sellers page, ready to deploy"

Agent: 
🔍 Analyzing changes...
   - Modified: website/admin/src/components/Sellers.jsx
   
🧪 Running pre-deployment tests on localhost...
   ✅ Server started at http://localhost:5173
   ✅ Login works
   ✅ Sellers page loads
   ✅ Create seller works
   ✅ Edit seller works
   ✅ No console errors
   
🔍 Code quality check...
   ✅ No console.logs
   ✅ No hardcoded credentials
   
📊 RESULTS: 6/6 tests passed (100%)
🚦 DEPLOYMENT STATUS: ✅ APPROVED

Committing and pushing to production...
```

**Example 2: Blocked Deployment**
```
You: "Push the contact form changes"

Agent:
🔍 Analyzing changes...
   - Modified: website/tecno-website/src/components/ContactSidecart.jsx
   
🧪 Running pre-deployment tests...
   ✅ Server started
   ✅ Page loads
   ❌ Form submission failed: Network error
   ❌ Console error: "Cannot read property 'email' of undefined"
   
📊 RESULTS: 2/4 tests passed (50%)
🚦 DEPLOYMENT STATUS: 🛑 BLOCKED

Cannot deploy with failing tests. Please fix:
1. Form submission network error
2. Undefined email property error

Would you like me to help debug these issues?
```

### GitHub Actions (Automatic on Push)

Two workflows run automatically on every push:

**1. Admin Panel Tests** (`.github/workflows/test-admin.yml`)
- Triggers on changes to `website/admin/**`
- Builds the admin panel
- Checks for build errors
- Runs linter
- Reports bundle size

**2. Website Tests** (`.github/workflows/test-website.yml`)
- Triggers on changes to `website/tecno-website/**`
- Builds the website
- Checks for build errors
- Runs linter
- Reports bundle size

**View results in GitHub:**
- Go to your repo → Actions tab
- See green ✅ or red ❌ for each push
- Click to see detailed logs

### Vercel Deployment Checks

After GitHub Actions pass, Vercel automatically:
- Builds preview deployment
- Runs build checks
- Deploys to production (if main branch)

**Full Pipeline:**
```
Code Change
    ↓
Pre-Deploy Agent Tests (Cursor) ✅
    ↓
Git Commit & Push
    ↓
GitHub Actions Tests ✅
    ↓
Vercel Build & Deploy ✅
    ↓
Production Live! 🚀
```

## Setting Up GitHub Actions

1. **Add secrets to GitHub repo:**
   - Go to repo Settings → Secrets and variables → Actions
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

2. **Workflows are already configured** in `.github/workflows/`

3. **They run automatically** on every push to main branch

## Support

If you encounter issues with the testing agents:
1. Check the agent configuration files
2. Review the test plan steps
3. Update credentials if they've changed
4. Report bugs in the agent logic

---

**Happy Testing! 🚀**

The agents will help you catch bugs early and ensure quality across deployments.

