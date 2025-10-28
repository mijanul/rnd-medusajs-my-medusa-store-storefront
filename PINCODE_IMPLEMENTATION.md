# Pincode-Based Product Pricing Implementation

## Summary of Changes

This implementation adds the ability to check product prices based on pincode/postal code. The feature allows users to enter their pincode and fetch location-specific pricing from the API.

## Changes Made

### 1. **API Function** (`src/lib/data/products.ts`)

Added a new server action `getProductWithPincodePrice`:

```typescript
export const getProductWithPincodePrice = async ({
  productId,
  pincode,
}: {
  productId: string
  pincode: string
}): Promise<any>
```

This function calls the API endpoint: `GET /store/products/{productId}/pincode-price?pincode={pincode}`

**Features:**

- No caching (`cache: "no-store"`) to always get fresh pricing data
- Includes authentication headers
- Error handling with console logging

### 2. **Pincode Price Component** (`src/modules/products/components/pincode-price/index.tsx`)

Created a new client-side component that provides:

**UI Elements:**

- Input field for pincode entry (6-digit numeric input)
- "Check" button to fetch pricing
- Loading state during API call
- Error message display
- Price display area showing:
  - Price for the entered pincode
  - Delivery estimate (if provided by API)
  - Availability status (if provided by API)

**Features:**

- Input validation (numeric only, max 6 digits)
- Loading states
- Error handling
- Optional callback `onPriceUpdate` for parent components to react to price changes

### 3. **Product Actions Integration** (`src/modules/products/components/product-actions/index.tsx`)

Integrated the pincode price component into the product details page:

- Added import for `PincodePrice` component
- Placed the component between product price and add-to-cart button
- Added a divider for visual separation

## API Requirements

Your backend API should implement the following endpoint:

```
GET /store/products/{productId}/pincode-price?pincode={pincode}
```

### Expected Response Format

```json
{
  "price": "₹1,299.00",
  "delivery_estimate": "3-5 business days",
  "availability": true
}
```

**Response Fields:**

- `price` (optional): Formatted price string for the pincode
- `delivery_estimate` (optional): Estimated delivery time
- `availability` (optional): Boolean indicating if delivery is available

## User Experience

1. User views a product detail page
2. Below the product price, they see a "Check Price for Your Pincode" section
3. User enters their 6-digit pincode
4. User clicks "Check" button
5. System fetches location-specific pricing from the API
6. Price details display in a highlighted box with:
   - The price for their pincode
   - Estimated delivery time (if available)
   - Availability status (if available)

## Testing

To test this feature:

1. Navigate to any product detail page
2. Locate the pincode input field below the product price
3. Enter a valid 6-digit pincode
4. Click "Check"
5. Verify the API is called: `GET /store/products/prod_abc123/pincode-price?pincode=110001`
6. Check that the response is displayed correctly

## Notes

- The component uses `"use client"` directive as it requires client-side interactivity
- The API function uses `"use server"` directive for server-side execution
- All product data fetching now uses `cache: "no-store"` to ensure fresh data
- The pincode input only accepts numeric values (0-9)
- Maximum pincode length is 6 digits
