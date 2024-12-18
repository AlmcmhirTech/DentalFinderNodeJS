<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZamTeeth - Book an Appointment</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="css/booking-style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/navbar-style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/footer-style.css?v=<?php echo time(); ?>">
</head>

<body>
    <?php
    session_start();
    // Assuming you have a session variable set when the user logs in
    $loggedIn = isset($_SESSION['user']);
    ?>

    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <a href="landing_page.php" style="text-decoration: none;"><img src="imgs/dental-logo.jpg" alt="DentaFinder Logo"></a>
            </div>
            <?php if ($loggedIn): ?>
                <div class="user-info">
                    <span>Welcome, <?php echo $_SESSION['user']['name']; ?></span>
                    <a href="logout.php"><button class="logout-btn">Log Out</button></a>
                </div>
            <?php else: ?>
                <a href="../login_register/login.php">
                    <button class="login-btn">Log In</button>
                </a>
            <?php endif; ?>
        </div>
    </nav>

    <main>
        <section class="booking-section">
            <div class="container">
                <div class="booking-content">
                    <div class="booking-image">
                        <img src="imgs/booking-image.jpg" alt="Dental Clinic" class="clinic-img">
                    </div>
                    <div class="booking-form">
                        <h2>Book an Appointment</h2>
                        <form action="submit_booking.php" method="POST">
                            <div class="form-group">
                                <label for="branch">Branch:</label>
                                <select id="branch" name="branch" required class="form-select">
                                    <option value="">Choose a branch</option>
                                    <option value="bright-smile-dental">Bright Smile Dental Clinic</option>
                                    <option value="happy-teeth-dental">Happy Teeth Dental Clinic</option>
                                    <option value="pearly-whites-dental">Pearly Whites Dental Clinic</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="service">Service:</label>
                                <select id="service" name="service" required class="form-select">
                                    <option value="">Choose a service</option>
                                    <option value="cleaning">Cleaning</option>
                                    <option value="whitening">Whitening</option>
                                    <option value="extraction">Extraction</option>
                                    <option value="fillings">Fillings</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="appointment-date">Select Date:</label>
                                <input type="date" id="appointment-date" name="appointment_date" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="appointment-time">Select Time:</label>
                                <input type="time" id="appointment-time" name="appointment_time" required class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Book Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

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
</body>

</html>