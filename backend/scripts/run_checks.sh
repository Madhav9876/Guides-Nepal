#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "🔍 Running Code Quality Checks..."

echo "1. Black (Formatting)..."
black --check .

echo "2. Ruff (Linting)..."
ruff check .

echo "3. Mypy (Type Checking)..."
mypy .

echo "✅ Quality Checks Passed!"

echo "🧪 Running Tests..."
PYTHONPATH=$PYTHONPATH:. pytest
echo "✅ Tests Passed!"

echo "🛡️ Running Security Checks..."
bandit -r app
# safety check # Commented out as it might require an API key in some versions, but keeping intention clear

echo "🎉 All checks passed!"
