
        // Example: Update dashboard statistics dynamically
        document.addEventListener('DOMContentLoaded', function () {
            // Fetch the card elements
            const totalDoctorsCard = document.querySelector('.card:nth-child(1) p');
            const totalPatientsCard = document.querySelector('.card:nth-child(2) p');
            const appointmentsTodayCard = document.querySelector('.card:nth-child(3) p');
            const pendingReportsCard = document.querySelector('.card:nth-child(4) p');
    
            // Simulate fetching data from an API or server
            const dashboardData = {
                totalDoctors: 30,
                totalPatients: 200,
                appointmentsToday: 40,
                pendingReports: 15
            };
    
            // Update the values on the dashboard
            totalDoctorsCard.textContent = dashboardData.totalDoctors;
            totalPatientsCard.textContent = dashboardData.totalPatients;
            appointmentsTodayCard.textContent = dashboardData.appointmentsToday;
            pendingReportsCard.textContent = dashboardData.pendingReports;
        });
    
        // Example: Add event listener to navigation links
        const navLinks = document.querySelectorAll('header table a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                alert(`Navigating to ${link.textContent}...`);
                // You can replace this with real navigation logic
            });
        });
   