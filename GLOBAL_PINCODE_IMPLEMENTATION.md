# Global Pincode Implementation

## Overview

This update adds a global pincode selector in the header section, allowing users to set their pincode once and have it persist across the application. The pincode is stored in localStorage and automatically used for product price checks.

## Changes Made

### 1. **Pincode Context** (`src/lib/context/pincode-context.tsx`)

- Created a new React context to manage pincode state globally
- Stores pincode in localStorage for persistence across sessions
- Provides `usePincode` hook for accessing pincode state throughout the app
- Features:
  - `pincode`: Current pincode value (or null)
  - `setPincode`: Function to update pincode
  - `isValidPincode`: Boolean indicating if pincode is valid (≥5 digits)

### 2. **Header Pincode Selector** (`src/modules/layout/components/pincode-selector/index.tsx`)

- New compact component displayed in the header
- Features two modes:
  - **Display mode**: Shows saved pincode with edit and clear buttons
  - **Edit mode**: Input field with save/cancel functionality
- User interactions:
  - Click on pincode to edit
  - Press Enter to save
  - Press Escape to cancel
  - Click X icon to clear pincode
- Validation: 5-6 digit numeric input
- Uses existing project icons (MapPin, X)

### 3. **Updated Navigation** (`src/modules/layout/templates/nav/index.tsx`)

- Added `HeaderPincodeSelector` component between side menu and account link
- Positioned in the header's right section for easy access
- Visible on small+ screens (hidden on mobile)

### 4. **Providers Wrapper** (`src/app/providers.tsx`)

- Created client-side providers wrapper for the root layout
- Wraps application with `PincodeProvider`
- Enables pincode context access throughout the app

### 5. **Root Layout Update** (`src/app/layout.tsx`)

- Integrated `Providers` component
- Ensures pincode context is available to all components

### 6. **Enhanced Product Pincode Component** (`src/modules/products/components/pincode-price/index.tsx`)

- Updated to integrate with global pincode context
- Auto-loads global pincode when available
- Automatically checks product price when global pincode is set
- Still allows manual pincode entry and checking
- Maintains backward compatibility with existing functionality

## User Experience Flow

### Setting Pincode Globally

1. User visits the website
2. In the header, they see a pincode input with MapPin icon
3. User enters their 6-digit pincode
4. User clicks "Save" or presses Enter
5. Pincode is saved and displayed in the header
6. Pincode persists across page refreshes (stored in localStorage)

### Editing/Clearing Pincode

- Click on displayed pincode to edit it
- Click X icon to clear the saved pincode
- Changes take effect immediately

### Product Price Checking

1. User navigates to a product page
2. If pincode is already set globally, product price is automatically fetched
3. Price displays immediately in the pincode price section
4. User can still manually enter a different pincode to check alternative pricing

## Technical Details

### State Management

- **Context API**: Used for global state management
- **localStorage**: Persists pincode across sessions
- **Client-side**: All pincode components are client components ("use client")

### Styling

- Uses existing Medusa UI components (Button, Input)
- Consistent with existing design system
- Responsive design (hidden on mobile for space)

### API Integration

- Maintains existing API endpoint: `GET /store/products/{productId}/pincode-price?pincode={pincode}`
- No backend changes required
- Works with existing price check functionality

## Benefits

1. **Better UX**: Users only need to set pincode once
2. **Persistence**: Pincode saved across sessions
3. **Automatic**: Product prices auto-check with saved pincode
4. **Flexible**: Users can still manually check different pincodes
5. **Visible**: Pincode always visible in header for transparency
6. **Easy Updates**: Click to edit, click to clear

## Testing Recommendations

1. Test pincode input validation (numeric, 5-6 digits)
2. Verify localStorage persistence across page refreshes
3. Check automatic price fetching on product pages
4. Test edit and clear functionality
5. Verify responsive behavior on different screen sizes
6. Test keyboard interactions (Enter, Escape)
7. Ensure backward compatibility with existing product pages
