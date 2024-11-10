document.addEventListener("DOMContentLoaded", function () {
    fetch("logs.json")
        .then(response => response.json())
        .then(data => {
            populateTable(data);
            generateCharts(data);
        });

    function populateTable(data) {
        const logTableBody = document.getElementById("logTable").querySelector("tbody");
        data.forEach(log => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${log.message.split(" ")[0]}</td>
                <td>${extractIP(log.message, "source_ip")}</td>
                <td>${extractIP(log.message, "destination_ip")}</td>
                <td>${extractProtocol(log.message)}</td>
                <td>${extractAction(log.message)}</td>
            `;
            logTableBody.appendChild(row);
        });
    }

    function extractIP(message, type) {
        const regex = new RegExp(`${type}': '([^']+)'`);
        const match = message.match(regex);
        return match ? match[1] : 'N/A';
    }

    function extractProtocol(message) {
        const protocolRegex = /'protocol': '([^']+)'/;
        const match = message.match(protocolRegex);
        return match ? match[1] : 'N/A';
    }

    function extractAction(message) {
        return message.includes("DENY") ? "DENY" : "ALLOW";
    }

    function generateCharts(data) {
        const actionCounts = { DENY: 0, ALLOW: 0 };
        const protocolCounts = {};

        data.forEach(log => {
            const action = extractAction(log.message);
            actionCounts[action] = (actionCounts[action] || 0) + 1;

            const protocol = extractProtocol(log.message);
            protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
        });

        createPieChart("actionChart", "Actions", actionCounts);
        createPieChart("protocolChart", "Protocols", protocolCounts);
    }

    function createPieChart(elementId, label, data) {
        const ctx = document.getElementById(elementId).getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: label,
                    data: Object.values(data),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                }]
            }
        });
    }
});
