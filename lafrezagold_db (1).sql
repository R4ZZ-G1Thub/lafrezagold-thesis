-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 07, 2025 at 10:00 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lafrezagold_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodations_images`
--

DROP TABLE IF EXISTS `accommodations_images`;
CREATE TABLE IF NOT EXISTS `accommodations_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accomodation_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `accomodation_id` (`accomodation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `accommodations_images`
--

INSERT INTO `accommodations_images` (`id`, `accomodation_id`, `image_path`, `created_at`) VALUES
(20, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-09 09:10:33'),
(19, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-09 09:10:33'),
(18, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 07:42:40'),
(17, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 07:42:40'),
(16, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 07:42:40'),
(15, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 04:11:00'),
(14, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 04:05:07'),
(13, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-07 03:10:02'),
(21, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-11 09:47:53'),
(22, 27, '../uploads/accomodations/accommodation_67823ef32b3a03.09755710.jpg', '2025-01-11 09:49:15'),
(23, 28, '../uploads/accomodations/accommodation_67823f9cb1beb0.35717636.jpg', '2025-01-11 09:53:32'),
(24, 28, '../uploads/accomodations/accommodation_67824013dea618.26396404.jpg', '2025-01-11 09:55:31'),
(25, 29, '../uploads/accomodations/accommodation_678241f6a46694.35184453.jpg', '2025-01-11 10:03:34'),
(26, 29, '../uploads/accomodations/accommodation_678241f6a486e0.85176935.jpg', '2025-01-11 10:03:34'),
(27, 29, '../uploads/accomodations/accommodation_678241f6a4a522.34766180.jpg', '2025-01-11 10:03:34'),
(28, 30, '../uploads/accomodations/accommodation_67989b309bc335.18063301.jpg', '2025-01-28 08:54:08'),
(29, 31, '../uploads/accomodations/accommodation_67989b63e7bfb3.67230024.jpg', '2025-01-28 08:54:59'),
(30, 32, '../uploads/accomodations/accommodation_679a01db6a2258.07153909.jpg', '2025-01-29 10:24:27'),
(31, 33, '../uploads/accomodations/accommodation_679a03bdd1ae81.85736420.jpg', '2025-01-29 10:32:29'),
(32, 33, '../uploads/accomodations/accommodation_679a03bdd1cfb7.06175485.jpg', '2025-01-29 10:32:29'),
(33, 34, '../uploads/accomodations/accommodation_679a04f4252894.38423551.jpg', '2025-01-29 10:37:40'),
(34, 35, '../uploads/accomodations/accommodation_67ded46a83b726.82102884.jpg', '2025-03-22 15:16:58'),
(35, 36, '../uploads/accomodations/accommodation_67ded4c5b1c5e3.67514505.jpg', '2025-03-22 15:18:29'),
(36, 37, '../uploads/accomodations/accommodation_67ded51e112cb5.57718261.jpg', '2025-03-22 15:19:58'),
(37, 38, '../uploads/accomodations/accommodation_67ded5563eea42.78294447.jpg', '2025-03-22 15:20:54'),
(38, 39, '../uploads/accomodations/accommodation_67ded596647809.33938308.jpg', '2025-03-22 15:21:58'),
(39, 40, '../uploads/accomodations/accommodation_67ded5e045d474.22993787.jpg', '2025-03-22 15:23:12'),
(40, 41, '../uploads/accomodations/accommodation_67ded621462e95.44531179.jpg', '2025-03-22 15:24:17'),
(41, 42, '../uploads/accomodations/accommodation_67ded66610c9c1.84998326.jpg', '2025-03-22 15:25:26'),
(42, 43, '../uploads/accomodations/accommodation_67ded7025a35b0.53822514.jpg', '2025-03-22 15:28:02'),
(43, 44, '../uploads/accomodations/accommodation_67ded793c93df1.71927257.jpg', '2025-03-22 15:30:27'),
(44, 45, '../uploads/accomodations/accommodation_67ded7e2e08570.81852311.jpg', '2025-03-22 15:31:46'),
(45, 46, '../uploads/accomodations/accommodation_67ded80a9cc033.66626409.jpg', '2025-03-22 15:32:26'),
(46, 47, '../uploads/accomodations/accommodation_67dedb4e486830.90911653.jpg', '2025-03-22 15:46:22'),
(47, 48, '../uploads/accomodations/accommodation_67dedb8f046147.69386071.jpg', '2025-03-22 15:47:27'),
(48, 49, '../uploads/accomodations/accommodation_67e44eb3155b64.39201206.jpg', '2025-03-26 19:00:03'),
(49, 50, '../uploads/accomodations/accommodation_67e99564d01e16.55569969.jpg', '2025-03-30 19:03:00'),
(50, 50, '../uploads/accomodations/accommodation_67e99564d08817.70986907.jpg', '2025-03-30 19:03:00'),
(51, 50, '../uploads/accomodations/accommodation_67e99564d0dc93.80648783.jpg', '2025-03-30 19:03:00'),
(52, 51, '../uploads/accomodations/accommodation_67eb248a443c05.80577543.jpg', '2025-03-31 23:26:02'),
(53, 52, '../uploads/accomodations/accommodation_67eb24cb571fb7.64684701.jpg', '2025-03-31 23:27:07'),
(54, 52, '../uploads/accomodations/accommodation_67eb24cb575ab7.62739049.jpg', '2025-03-31 23:27:07'),
(55, 52, '../uploads/accomodations/accommodation_67eb24cb57aa27.09487357.jpg', '2025-03-31 23:27:07'),
(56, 53, '../uploads/accomodations/accommodation_67eb2583a97e84.00931560.jpg', '2025-03-31 23:30:11'),
(57, 53, '../uploads/accomodations/accommodation_67eb2583a99da3.28183233.jpg', '2025-03-31 23:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `accomodations`
--

DROP TABLE IF EXISTS `accomodations`;
CREATE TABLE IF NOT EXISTS `accomodations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accomodation_name` varchar(250) NOT NULL,
  `accomodation_type` enum('Room','Cottage') NOT NULL,
  `features` text,
  `capacity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `availability` enum('Available','Booked') DEFAULT 'Available',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `accomodations`
--

INSERT INTO `accomodations` (`id`, `accomodation_name`, `accomodation_type`, `features`, `capacity`, `price`, `created_at`, `availability`) VALUES
(39, 'CANNA', 'Room', 'Air-Conditioned Room, TV, Single-Burner Stove, Fridge, Shower Room, Balcony', 6, 6500.00, '2025-03-22 15:21:46', 'Available'),
(38, 'IRIS', 'Room', 'Air-Conditioned Room, TV, Fridge, Shower Room, Balcony, Single-burner Stove', 6, 6500.00, '2025-03-22 15:20:54', 'Available'),
(37, 'DAISY', 'Room', 'Air-conditioned Room, TV, 2-Burner Stove, Refridgerator, Hot and Cold Shower, Comfort Room, Balcony', 20, 18500.00, '2025-03-22 15:19:58', 'Available'),
(35, 'HOTEL ROOM', 'Room', 'Veranda w/ Coffee Table, Beach and Swimming Pool View, Air Conditioned Room, TV, Fridge, Comfort Room, Hot and Cold Shower', 4, 6000.00, '2025-03-22 15:16:58', 'Available'),
(36, 'HOTEL ROOM', 'Room', 'Veranda w/ Coffee Table, Beach Front View and Swimming Pool View, Air-conditioned Room, TV, Fridge, Comfort Room, Hot and Cold Ahower, Free Breakfast', 6, 12000.00, '2025-03-22 15:18:29', 'Available'),
(40, 'ZINNIA', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, Fridge, Shower Room, Balcony', 10, 10500.00, '2025-03-22 15:23:12', 'Available'),
(41, 'FUJI', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, Fridge, Shower Room, Balcony', 20, 16500.00, '2025-03-22 15:24:17', 'Available'),
(42, 'LILAC', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, Fridge, Shower Room, Balcony', 20, 16500.00, '2025-03-22 15:25:26', 'Available'),
(43, 'IBERIS', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, Fridge, Shower Room, Balcony', 36, 27500.00, '2025-03-22 15:28:02', 'Available'),
(44, 'LILY', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, Fridge, Hot and Cold Shower, Balcony', 32, 25500.00, '2025-03-22 15:30:27', 'Available'),
(45, 'LOTUS', 'Room', 'Air-Conditioned Room, TV, 2-Burner Stove, FFridge, Hot and Cold Shower, Balcony', 28, 23500.00, '2025-03-22 15:31:46', 'Available'),
(46, 'PEONY', 'Room', 'Air-Conditioned Room, Common CR', 4, 4000.00, '2025-03-22 15:32:26', 'Available'),
(47, 'GAZEBO', 'Cottage', 'ENRANCE: 300 Adults | 250 Children', 15, 2500.00, '2025-03-22 15:46:22', 'Available'),
(51, 'OPEN COTTAGE', 'Cottage', '', 10, 1500.00, '2025-03-31 23:26:02', 'Available'),
(53, 'Executive Suite', 'Room', '2 queen beds, Free breakfast', 36, 44000.00, '2025-03-31 23:30:11', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `admin_accounts`
--

DROP TABLE IF EXISTS `admin_accounts`;
CREATE TABLE IF NOT EXISTS `admin_accounts` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(100) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_username` (`admin_username`),
  UNIQUE KEY `admin_email` (`admin_email`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_accounts`
--

INSERT INTO `admin_accounts` (`admin_id`, `admin_name`, `admin_username`, `admin_email`, `admin_password`) VALUES
(1, 'Dianne Ramirez', 'siDayan', 'ramirez@gmail.com', '$2y$10$Jl2/TjY.P/CGUDOat6JzGelWWYCX1KnC5PWQplbdp6zTVHlKhlqYK');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int NOT NULL,
  `accommodation_id` int NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `adults` int DEFAULT '0',
  `children` int DEFAULT '0',
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accommodation_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `guest_id` (`guest_id`),
  KEY `accommodation_id` (`accommodation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
CREATE TABLE IF NOT EXISTS `guests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guest_name` varchar(255) NOT NULL,
  `guest_email` varchar(100) NOT NULL,
  `contact_number` double NOT NULL,
  `guest_password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `guest_name`, `guest_email`, `contact_number`, `guest_password`) VALUES
(4, 'Jan Derrick Bentley', 'jd@example.com', 9991230099, '$2y$10$Pc3dZH7Yq7TVhDm9b8w9bOUxyJJAKX60KKawoyBFLd2igExUPRCjC'),
(6, 'Dianne Ramirez', 'ramirez@example.com', 9991231234, '$2y$10$tk0hSJ2z.jQd7Jy2dyC/heMLgRTyc0F5mr6gO.tMvuS5qoQRX1qN.');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int NOT NULL,
  `accommodation_id` int NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','approved','declined','canceled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reservation_id`),
  KEY `guest_id` (`guest_id`),
  KEY `accommodation_id` (`accommodation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `guest_id`, `accommodation_id`, `date_from`, `date_to`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 37, '2025-04-05', '2025-04-06', 18500.00, 'approved', '2025-04-04 17:19:04', '2025-04-07 00:18:23'),
(2, 6, 35, '2025-04-07', '2025-04-08', 6000.00, 'approved', '2025-04-07 01:54:38', '2025-04-07 07:23:48'),
(11, 6, 43, '2025-04-07', '2025-04-08', 27500.00, 'pending', '2025-04-07 08:53:00', '2025-04-07 08:53:00'),
(9, 6, 38, '2025-04-05', '2025-04-06', 6800.00, 'pending', '2025-04-07 07:45:26', '2025-04-07 07:45:26'),
(10, 6, 42, '2025-04-07', '2025-04-08', 16500.00, 'approved', '2025-04-07 08:53:00', '2025-04-07 08:54:48'),
(7, 4, 37, '2025-04-05', '2025-04-06', 18500.00, 'pending', '2025-04-07 07:30:29', '2025-04-07 07:30:29');

-- --------------------------------------------------------

--
-- Table structure for table `staff_accounts`
--

DROP TABLE IF EXISTS `staff_accounts`;
CREATE TABLE IF NOT EXISTS `staff_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(100) NOT NULL,
  `staff_username` varchar(50) NOT NULL,
  `staff_email` varchar(100) NOT NULL,
  `staff_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `staff_username` (`staff_username`),
  UNIQUE KEY `staff_email` (`staff_email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `staff_accounts`
--

INSERT INTO `staff_accounts` (`id`, `staff_name`, `staff_username`, `staff_email`, `staff_password`) VALUES
(4, 'Mark Ian Falsario', 'markian123', 'falsario@example.com', '$2y$10$hImYmiVAJ6X0ByPvoGS/sudgYGarzXeG99to/Fg9ZBD.SRjrXU7Ye');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int NOT NULL,
  `reservation_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'GCash',
  `status` varchar(20) DEFAULT 'paid',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `guest_id` (`guest_id`),
  KEY `reservation_id` (`reservation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
