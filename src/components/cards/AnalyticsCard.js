import React from "react";
import { Box, Text, Heading } from "../elements";
import { Icon } from "../elements";

export default function AnalyticsCard({ item, value, value1, color }) {
    return (
        <Box className="mc-crm-card" style={{ backgroundColor: color }}>
            <Box className="mc-crm-card-group">
                <Icon className={`material-icons ${item.iconColor}`} style={{ fontSize: 30 }}>{item.icon}</Icon>
                <h2 style={{ color: 'white' }}>{value}</h2>
                <h2 style={{ color: 'white' }}>{value1}</h2>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
            </Box>
        </Box>
    );
}
