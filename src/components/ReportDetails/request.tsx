interface AlternativeData {
    id: number;
    matched_material_id: number;
    country: string;
    product_name: string;
}

interface RequestBody {
    filename: string;
    data: AlternativeData[];
}

async function approveAlternative(requestBody: RequestBody, onApproveResult: any): Promise<void> {
    try {
        const response = await fetch('https://csci-api-skthk6k3ja-ew.a.run.app/approve_alternative', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        onApproveResult('is approved')
        console.log('Response:', responseData);
    } catch (error) {
        onApproveResult('its failed');
        console.error('Error:', error);
    }
}

// Example usage:
const requestBody: RequestBody = {
    filename: 'InventoryReport_4529276_02_2024.csv',
    data: [
        {
            id: 34,
            matched_material_id: 60072181,
            country: 'South Africa',
            product_name: 'SERENADE ASO SC 2X10L BOT ZA'
        }
    ]
};


export default approveAlternative

