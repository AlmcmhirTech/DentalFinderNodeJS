<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeco - Study Smart</title>
    <link rel="stylesheet" href="css/landing-page-style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/navbar-style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/footer-style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/browse-clinics-style.css?v=<?php echo time(); ?>"> <!-- New stylesheet for browse page -->
</head>

<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <a href="landing_page.php" style="text-decoration: none;"><img src="imgs/dental-logo.jpg" alt="DentaFinder Logo"></a>
            </div>
            <a href="../login_register/login.php">
                <button class="login-btn">Log In</button>
            </a>
        </div>
    </nav>

    <main>
        <!-- Existing sections here... -->

        <!-- New Browse Clinics Section -->
        <section class="browse-clinics">
            <div class="container">
                <h2>Browse Dental Clinics</h2>
                <div class="search-filter-bar">
                    <input type="text" id="search-bar" placeholder="Search for clinics...">
                    <select id="location-filter">
                        <option value="">All Locations</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                        <!-- Add more options as needed -->
                    </select>
                    <select id="specialty-filter">
                        <option value="">All Specialties</option>
                        <option value="orthodontics">Orthodontics</option>
                        <option value="pediatric">Pediatric</option>
                        <option value="cosmetic">Cosmetic</option>
                        <!-- Add more options as needed -->
                    </select>
                </div>
                <div class="clinics-list">
                    <!-- Example Clinic Card -->
                    <div class="clinic-card">
                        <img src="imgs/clinic-1.jpg" alt="Clinic Image" class="clinic-img">
                        <div class="clinic-info">
                            <h3>Bright Smile Dental Clinic</h3>
                            <p>Location: New York</p>
                            <p>Specialty: Orthodontics</p>
                            <button class="btn-primary">View Details</button>
                        </div>
                    </div>
                    <!-- Add more clinic cards as needed -->
                </div>
            </div>
        </section>
        <!-- End of Browse Clinics Section -->

        <!-- Existing sections here... -->

        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-section">
                        <h3>About us</h3>
                        <ul>
                            <li><a href="#">Mission</a></li>
                            <li><a href="#">Vision</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Privacy and Terms</h3>
                        <ul>
                            <li><a href="#">Community guidelines</a></li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Help and Support</h3>
                        <ul>
                            <li><a href="faq.php">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </main>
</body>
<script>
    document.getElementById('search-bar').addEventListener('input', filterClinics);
    document.getElementById('location-filter').addEventListener('change', filterClinics);
    document.getElementById('specialty-filter').addEventListener('change', filterClinics);

    function filterClinics() {
        const searchQuery = document.getElementById('search-bar').value.toLowerCase();
        const locationFilter = document.getElementById('location-filter').value;
        const specialtyFilter = document.getElementById('specialty-filter').value;

        const clinics = document.querySelectorAll('.clinic-card');

        clinics.forEach(clinic => {
            const clinicName = clinic.querySelector('h3').textContent.toLowerCase();
            const clinicLocation = clinic.querySelector('p:nth-child(2)').textContent.toLowerCase();
            const clinicSpecialty = clinic.querySelector('p:nth-child(3)').textContent.toLowerCase();

            if (
                (clinicName.includes(searchQuery) || searchQuery === '') &&
                (clinicLocation.includes(locationFilter) || locationFilter === '') &&
                (clinicSpecialty.includes(specialtyFilter) || specialtyFilter === '')
            ) {
                clinic.style.display = 'block';
            } else {
                clinic.style.display = 'none';
            }
        });
    }
</script>

</html>