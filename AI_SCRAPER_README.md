# AI Event Scraper Setup Guide

## 🎯 What This Does

Automatically scrapes and curates yoga/wellness events in the Netherlands daily using AI, with customizable prompts and quality ratings.

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install --save-dev openai @anthropic-ai/sdk tsx @types/node
```

### 2. Configure AI Provider

Choose between OpenAI (GPT-4) or Anthropic (Claude):

**Option A: OpenAI (Recommended)**
- Get API key from https://platform.openai.com/api-keys
- Cost: ~$0.01-0.05 per run

**Option B: Anthropic Claude**
- Get API key from https://console.anthropic.com/
- Cost: ~$0.01-0.03 per run

### 3. Add GitHub Secrets

Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these secrets:

| Secret Name | Value | Required |
|------------|-------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | If using OpenAI |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | If using Claude |
| `AI_PROVIDER` | `openai` or `anthropic` | Optional (defaults to openai) |

### 4. Customize AI Behavior

Edit `ai-config.json` to customize:

#### Search Prompts
```json
"searchPrompts": {
  "keywords": [
    "yoga retreat Netherlands",
    "meditation workshop Amsterdam"
  ]
}
```

#### Rating Criteria
```json
"ratingCriteria": {
  "rules": [
    {
      "condition": "Event by well-known yoga schools",
      "impact": "+1 star",
      "reason": "Reputable organizer"
    }
  ]
}
```

#### Quality Threshold
```json
"minimumRating": 3.0  // Only events ≥3 stars will be added
```

## 🚀 Usage

### Automatic Daily Run
- Runs every day at 23:30 CET
- Creates a Pull Request with new events
- Review and merge manually

### Manual Trigger
1. Go to `Actions` tab in GitHub
2. Select "Daily Event Update"
3. Click "Run workflow"

### Local Testing
```bash
# Set environment variable
export OPENAI_API_KEY="your-key-here"

# Run scraper
npx tsx scripts/ai-event-scraper.ts
```

## 📊 How It Works

1. **AI Search**: Sends prompts to OpenAI/Claude to find events
2. **Data Extraction**: Parses event details (title, date, venue, etc.)
3. **AI Rating**: Each event rated 1-5 stars based on criteria
4. **Quality Filter**: Only events ≥ minimum rating are kept
5. **Deduplication**: Checks for existing events
6. **File Update**: Adds new events to `src/data/events.ts`
7. **Pull Request**: Creates PR for review

## ⚙️ Configuration Options

### ai-config.json

```json
{
  "aiProvider": "openai",  // or "anthropic"
  
  "searchPrompts": {
    "keywords": ["..."],     // What to search for
    "sources": ["..."],      // Where to look
    "exclusions": ["..."]    // What to ignore
  },
  
  "ratingCriteria": {
    "weights": {
      "authenticReputation": 0.30,
      "venueQuality": 0.20,
      "instructorCredentials": 0.20
    },
    "minimumRating": 3.0
  },
  
  "schedule": {
    "maxEventsPerRun": 10,
    "maxEventsInDatabase": 150,
    "archiveAfterDays": 180
  }
}
```

## 🎨 Customizing Prompts

### Example: Focus on Specific Types

```json
"searchPrompts": {
  "mainQuery": "Find only silent meditation retreats and yin yoga workshops",
  "keywords": [
    "silent retreat Netherlands",
    "yin yoga workshop",
    "meditation intensive"
  ]
}
```

### Example: Stricter Quality

```json
"ratingCriteria": {
  "minimumRating": 4.0,  // Only top-rated events
  "rules": [
    {
      "condition": "Instructor is not internationally certified",
      "impact": "-2 stars"
    }
  ]
}
```

## 🐛 Troubleshooting

### Workflow Fails
- Check GitHub Actions logs
- Verify API keys are set correctly
- Ensure API key has credits

### No Events Found
- Adjust search keywords to be less specific
- Lower minimum rating threshold
- Check AI provider logs

### Duplicate Events
- Algorithm checks title, organizer, venue, and dates
- Review deduplication logic in scraper

## 💰 Cost Estimation

**Per Run:**
- OpenAI GPT-4: ~$0.01-0.05
- Anthropic Claude: ~$0.01-0.03

**Monthly (30 runs):**
- ~$0.30 - $1.50

**Annual:**
- ~$4 - $18

## 🔒 Security

- API keys stored as GitHub Secrets (encrypted)
- Never committed to repository
- Only accessible in GitHub Actions

## 📝 Next Steps

1. Install dependencies: `npm install --save-dev openai @anthropic-ai/sdk tsx @types/node`
2. Add API key to GitHub Secrets
3. Customize `ai-config.json` with your preferences
4. Test locally: `npx tsx scripts/ai-event-scraper.ts`
5. Enable workflow in GitHub Actions
6. Review first Pull Request

## 🤝 Need Help?

- AI provider issues: Check API status pages
- Configuration help: Review `ai-config.json` comments
- Code issues: Check `scripts/ai-event-scraper.ts`
