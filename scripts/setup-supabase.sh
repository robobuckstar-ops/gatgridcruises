#!/bin/bash
# ============================================
# GatGridCruises — Supabase Setup Script
# ============================================
# This script helps you set up the Supabase database.
#
# Prerequisites:
#   1. A Supabase account (https://supabase.com)
#   2. Supabase CLI installed: npm install -g supabase
#   3. Your project created in the Supabase dashboard
#
# Usage:
#   chmod +x scripts/setup-supabase.sh
#   ./scripts/setup-supabase.sh

set -e

echo ""
echo "⚓ GatGridCruises — Supabase Setup"
echo "==================================="
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found."
    echo "   Install it with: npm install -g supabase"
    echo "   Or: brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Check for migration file
MIGRATION_FILE="supabase/migrations/001_initial_schema.sql"
if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Migration file not found at $MIGRATION_FILE"
    echo "   Make sure you're running this from the project root."
    exit 1
fi

echo "✅ Migration file found"
echo ""

echo "Choose setup method:"
echo ""
echo "  1) Supabase CLI (recommended for local dev)"
echo "  2) Manual (paste SQL into Supabase Dashboard)"
echo ""
read -p "Enter choice [1/2]: " choice

case $choice in
    1)
        echo ""
        echo "Starting Supabase local development..."
        supabase init 2>/dev/null || true
        supabase start
        echo ""
        echo "Running migration..."
        supabase db reset
        echo ""
        echo "✅ Local Supabase is running!"
        echo ""
        echo "Your local credentials:"
        supabase status
        echo ""
        echo "Copy the API URL and anon key to your .env.local file."
        ;;
    2)
        echo ""
        echo "Manual Setup Instructions:"
        echo "=========================="
        echo ""
        echo "1. Go to https://supabase.com/dashboard"
        echo "2. Select your project (or create one)"
        echo "3. Go to SQL Editor → New Query"
        echo "4. Paste the contents of: $MIGRATION_FILE"
        echo "5. Click 'Run'"
        echo ""
        echo "Then update your .env.local with:"
        echo "  - Project Settings → API → Project URL → NEXT_PUBLIC_SUPABASE_URL"
        echo "  - Project Settings → API → anon/public key → NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "  - Project Settings → API → service_role key → SUPABASE_SERVICE_ROLE_KEY"
        echo ""
        echo "The migration creates these tables:"
        echo "  • ships          - 8 Disney cruise ships"
        echo "  • ports          - Departure ports"
        echo "  • sailings       - Active cruise sailings"
        echo "  • itinerary_days - Day-by-day itineraries"
        echo "  • price_snapshots - Historical pricing data"
        echo "  • staterooms     - Cabin categories per ship"
        echo "  • pre_cruise_hotels - Recommended hotels by port"
        echo "  • transfer_options - Airport/hotel transfers"
        echo "  • subscribers    - Newsletter subscribers"
        echo "  • ad_slots       - Advertising placements"
        echo ""
        echo "All tables include RLS policies, indexes, and update triggers."
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "🎉 Next steps:"
echo "  1. Update .env.local with your Supabase credentials"
echo "  2. Run: npm run dev"
echo "  3. Visit http://localhost:3000"
echo ""
