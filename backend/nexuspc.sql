-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Mar 25, 2026 at 01:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexuspc`
--

-- --------------------------------------------------------

--
-- Table structure for table `adapters`
--

CREATE TABLE `adapters` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Adapters',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adapters`
--

INSERT INTO `adapters` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'apple adapter', '1765284334_apple adapter.PNG', '4,999 pkr', NULL, 10, 'Processor', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory'),
(2, 'apple 3 pin adapter', '1766269013_apple 3 pin adapter.PNG', '5000', '6500', 10, 'Adapters', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory');

-- --------------------------------------------------------

--
-- Table structure for table `admin_notifications`
--

CREATE TABLE `admin_notifications` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(50) DEFAULT 'order',
  `link` varchar(255) DEFAULT '#',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_notifications`
--

INSERT INTO `admin_notifications` (`id`, `message`, `type`, `link`, `is_read`, `created_at`) VALUES
(1, 'New Order #1 received from Ayan', 'order', '?page=order_details&id=1', 1, '2025-12-17 19:13:05'),
(2, 'New Order #2 received from umair babar2', 'order', '?page=order_details&id=2', 1, '2025-12-18 14:24:06'),
(3, 'New Order #3 received from raza', 'order', '?page=order_details&id=3', 1, '2025-12-18 17:50:51'),
(4, 'New Order #4 received from hashim', 'order', '?page=order_details&id=4', 1, '2025-12-19 22:32:37'),
(5, 'New Order #5 received from hashim shahid karar', 'order', '?page=order_details&id=5', 1, '2025-12-19 23:00:33'),
(6, 'New Order #6 received from hashim shahid karar', 'order', '?page=order_details&id=6', 1, '2025-12-24 02:14:10'),
(7, 'New Order #7 received from hashim shahid karar', 'order', '?page=order_details&id=7', 1, '2025-12-26 10:33:54'),
(8, 'New Order #8 received from umair babar', 'order', '?page=order_details&id=8', 1, '2025-12-28 08:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `airbuds`
--

CREATE TABLE `airbuds` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Airbuds',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airbuds`
--

INSERT INTO `airbuds` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'Airpods Pro2', '1765287751_aipods pro2.PNG', '1599', NULL, 10, 'Airbuds', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory');

-- --------------------------------------------------------

--
-- Table structure for table `airpods`
--

CREATE TABLE `airpods` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'AirPods',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airpods`
--

INSERT INTO `airpods` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'P9 Pro Max Wireless Bluetooth Headphones', '1765289248_P9 Pro Max Wireless Bluetooth Headphones.PNG', '3150', NULL, 10, 'Airpods', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory');

-- --------------------------------------------------------

--
-- Table structure for table `ai_usage`
--

CREATE TABLE `ai_usage` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_count` int(11) NOT NULL DEFAULT 0,
  `last_request_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ai_usage`
--

INSERT INTO `ai_usage` (`id`, `user_id`, `request_count`, `last_request_date`) VALUES
(1, 12, 3, '2025-08-22'),
(2, 12, 10, '2025-08-23');

-- --------------------------------------------------------

--
-- Table structure for table `cables`
--

CREATE TABLE `cables` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Cables',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carousel_slides`
--

CREATE TABLE `carousel_slides` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `show_buttons` tinyint(1) DEFAULT 0,
  `cta_text` varchar(100) DEFAULT NULL,
  `cta_link` varchar(500) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carousel_slides`
--

INSERT INTO `carousel_slides` (`id`, `title`, `subtitle`, `description`, `image_url`, `show_buttons`, `cta_text`, `cta_link`, `display_order`, `status`, `created_at`) VALUES
(1, 'BUILD YOUR DREAM GAMING RIG', 'Nexus PC is Pakistan\'s premier destination for high-performance custom gaming PCs. Trusted by enthusiasts and professionals alike for 20+ years.', 'Whether you\'re a gamer, content creator, or a professional, we offer hand-picked components — from GPUs, CPUs to Motherboards and workstation builds.', 'carousel1.jpg', 1, NULL, NULL, 1, 'active', '2025-11-10 01:34:41'),
(2, 'UNLEASH PEAK PERFORMANCE', 'Experience next-level gaming with our expertly crafted custom PCs.', NULL, 'carousel2.jpg', 0, 'Shop Components', 'products/product.php', 2, 'active', '2025-11-10 01:34:41'),
(3, 'LATEST RTX GRAPHICS CARDS', 'Power your gameplay with the latest GPUs from NVIDIA and AMD.', NULL, 'carousel3.jpg', 0, 'View GPUs', 'products/product.php?category=GPU', 3, 'active', '2025-11-10 01:34:41'),
(4, 'BUILD YOUR DREAM RIG', 'Use our custom PC builder to select parts and create your perfect machine.', NULL, 'carousel4.jpg', 0, 'Start Building', 'custom_build_ryzen.php', 4, 'active', '2025-11-10 01:34:41');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `session_id`, `created_at`, `updated_at`) VALUES
(1, NULL, 'gk7kotna6n2qc3um13n9kigp38', '2025-12-17 19:12:35', '2025-12-17 19:12:35'),
(2, 17, NULL, '2025-12-18 14:23:15', '2025-12-18 14:23:15'),
(3, 16, NULL, '2025-12-18 17:45:26', '2025-12-18 17:45:26'),
(4, NULL, 'bn5d8df8qk99q56upn70kl7o7v', '2025-12-21 14:11:34', '2025-12-21 14:11:34'),
(5, NULL, '9rhgcsnnj0oarnfns6mlgdijui', '2025-12-24 02:10:43', '2025-12-24 02:10:43'),
(6, 21, NULL, '2025-12-26 10:33:36', '2025-12-26 10:33:36');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_table` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `product_table`, `quantity`) VALUES
(7, 4, '1', 'adapters', 1),
(8, 3, '2', 'adapters', 1),
(9, 5, '61', 'cpu', 1),
(15, 2, '36', 'psu', 1),
(16, 2, '61', 'gpu', 1),
(17, 2, '1', 'airbuds', 1),
(18, 2, '111', 'mobo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Cases',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'polo cover', '1766079705_polo cover.PNG', '190', NULL, 10, 'Cases', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory'),
(2, 'pop shocked covers', '1766079872_pop shocked cover.PNG', '220', NULL, 10, 'Cases', NULL, NULL, 'In Stock', NULL, 'Mobile Accessory');

-- --------------------------------------------------------

--
-- Table structure for table `casing`
--

CREATE TABLE `casing` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casing`
--

INSERT INTO `casing` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'DarkFlash DK431 ARGB Mid-Tower ATX Gaming Case ', '1758809503_DarkFlash DK431 ARGB Mid-Tower ATX Gaming Case.PNG', '17,000 pkr', NULL, 10, 'Casing', NULL, 'A stylish mid-tower ATX gaming case with vibrant ARGB lighting and excellent airflow to keep your components cool during intense gaming sessions.', 'In Stock', NULL, 'PC Component'),
(2, 'Boost Puma ATX Gaming Case – Black', '1759324805_Boost Puma ATX Gaming Case – Black.PNG', '5,999 pkr', NULL, 10, 'Casing', NULL, 'A compact and affordable ATX gaming case with a sleek black design, perfect for budget-friendly builds without compromising on style.', 'In Stock', NULL, 'PC Component'),
(3, 'Boost Panther mATX Gaming Case (Without Fans) – Black', '1759324882_Boost Panther mATX Gaming Case (Without Fans) – Black.PNG', '7,499 pkr', NULL, 10, 'Casing', NULL, 'A micro-ATX gaming case with a clean, minimalist black design. It offers a great starting point for a compact yet powerful PC build.', 'In Stock', NULL, 'PC Component'),
(4, 'AA-Tigers Fury ATX Gaming Case – Black', '1759324945_AA-Tigers Fury ATX Gaming Case – Black.PNG', '9,700 pkr', NULL, 10, 'Casing', NULL, 'An aggressive-looking ATX gaming case in black, designed for gamers who want their rig to stand out. Features ample space for high-end components.', 'In Stock', NULL, 'PC Component'),
(5, 'Boost Wolf mATX Gaming Case – Black', '1759325009_Boost Wolf mATX Gaming Case – Black.PNG', '9,800 pkr', NULL, 10, 'Casing', NULL, 'A modern micro-ATX gaming case in black, offering a balance of compact size and good airflow for your essential gaming components.', 'In Stock', NULL, 'PC Component'),
(6, 'Sonic R19 ATX ARGB Gaming Case (3x ARGB Fans) – Black', '1759325132_Sonic R19 ATX ARGB Gaming Case (3x ARGB Fans) – Black.PNG', '10,499 pkr', NULL, 10, 'Casing', NULL, 'This ATX gaming case comes with three pre-installed ARGB fans, providing stunning aesthetics and effective cooling right out of the box.', 'In Stock', NULL, 'PC Component'),
(7, 'Sonic R28 ATX ARGB Gaming Case (3x ARGB Fans) – Black', '1759326534_Sonic R28 ATX ARGB Gaming Case (3x ARGB Fans) – Black.PNG', '10,499 pkr', NULL, 10, 'Casing', NULL, 'An ATX ARGB gaming case that includes three ARGB fans to illuminate your build and ensure optimal thermal performance.', 'In Stock', NULL, 'PC Component'),
(8, 'Sonic E3BL M-ATX ARGB Gaming Case (3x ARGB Fans) – White', '1759326722_Sonic E3BL M-ATX ARGB Gaming Case (3x ARGB Fans) –.PNG', '10,999 pkr', NULL, 10, 'Casing', NULL, 'A beautiful M-ATX gaming case in a clean white finish, complete with three pre-installed ARGB fans for a vibrant and cool system.', 'In Stock', NULL, 'PC Component'),
(9, 'MSI MAG Forge M100A M-ATX Gaming Case', '1759327012_MSI MAG Forge M100A M-ATX Gaming Case.PNG', '11,899 pkr', NULL, 10, 'Casing', NULL, 'A quality micro-ATX gaming case from MSI, designed for reliable performance with good airflow and easy installation.', 'In Stock', NULL, 'PC Component'),
(10, 'Sonic K10 ATX ARGB Gaming Case (3x ARGB Fans) – Black', '1759327224_Sonic K10 ATX ARGB Gaming Case (3x ARGB Fans) – Black.PNG', '12,500 pkr', NULL, 10, 'Casing', NULL, 'This sleek black ATX gaming case includes three ARGB fans, offering a great combination of visual flair and cooling efficiency.', 'In Stock', NULL, 'PC Component'),
(11, 'Frozer Warrior M-ATX ARGB Gaming Case (3x ARGB Fans)  - Black', '1759327854_Frozer Warrior M-ATX ARGB Gaming Case (3x ARGB Fans) – Black.PNG', '14,000 pkr', NULL, 10, 'Casing', NULL, 'A robust M-ATX gaming case in black, featuring three ARGB fans to create a visually appealing and well-cooled gaming setup.', 'In Stock', NULL, 'PC Component'),
(12, 'Sonic C05 ARGB Mid-Tower ATX Gaming Case – white', '1759328045_Sonic C05 ARGB Mid-Tower ATX Gaming Case – Black.PNG', '15,999 pkr', NULL, 10, 'Casing', NULL, 'A stunning mid-tower ATX gaming case in white, featuring ARGB lighting to showcase your build in style.', 'In Stock', NULL, 'PC Component'),
(13, 'XPG Valor Air Mid-Tower ATX Case – Black', '1759328243_XPG Valor Air Mid-Tower ATX Case – Black.PNG', '15,499 pkr', NULL, 10, 'Casing', NULL, 'A mid-tower ATX case focused on high airflow, ensuring your components stay cool under load. Its minimalist black design fits any setup.', 'In Stock', NULL, 'PC Component'),
(14, 'XPG Valor Air Plus Mid-Tower ATX Gaming Case – White', '1759328467_XPG Valor Air Plus Mid-Tower ATX Gaming Case – White.PNG', '15,999 pkr', NULL, 10, 'Casing', NULL, 'This white mid-tower ATX case enhances airflow and includes ARGB fans, making it a perfect choice for a high-performance, stylish build.', 'In Stock', NULL, 'PC Component'),
(15, 'Sonic EL2 ATX ARGB Gaming Case (4x ARGB Fans)', '1759328716_Sonic EL2 ATX ARGB Gaming Case (4x ARGB Fans).PNG', '15,999 pkr', NULL, 10, 'Casing', NULL, 'An ATX gaming case equipped with four ARGB fans, providing comprehensive cooling and a dazzling light show for your entire system.', 'In Stock', NULL, 'PC Component'),
(16, 'Frozer Space MT M-ATX ARGB Gaming Case (4x ARGB Fans) – Black', '1759328887_Frozer Space MT M-ATX ARGB Gaming Case (4x ARGB Fans) – Black.PNG', '16,999 pkr', NULL, 10, 'Casing', NULL, 'A compact M-ATX gaming case in black that comes with four ARGB fans, offering maximum cooling and style in a smaller form factor.', 'In Stock', NULL, 'PC Component'),
(17, 'Lian Li LANCOOL 205M Mesh ARGB mATX Case – White', '1759329081_Lian Li LANCOOL 205M Mesh ARGB mATX Case – White.PNG', '19,499 pkr', NULL, 10, 'Casing', NULL, 'A premium mATX case from Lian Li in a clean white finish, featuring a mesh front panel for superior airflow and ARGB fans for aesthetics.', 'In Stock', NULL, 'PC Component'),
(18, 'DarkFlash DY470 Mid-Tower ATX Gaming Case – Black (without Fans)', '1759329429_DarkFlash DY470 Mid Tower ATX Gaming Case Black (without Fans).PNG', '21,499 pkr', NULL, 10, 'Casing', NULL, 'A sleek and modern mid-tower ATX gaming case in black. This fan-less version allows you to customize your cooling setup completely.', 'In Stock', NULL, 'PC Component'),
(19, 'AeroCool Interstellar ARGB Mid-Tower ATX Case', '1759330004_AeroCool Interstellar ARGB Mid-Tower ATX Case.PNG', '21,499 pkr', NULL, 10, 'Casing', NULL, 'A mid-tower ATX case with a unique front panel design and ARGB lighting, offering a futuristic look and solid cooling performance.', 'In Stock', NULL, 'PC Component'),
(20, 'EASE EC125 RGB Mid-Tower ATX Gaming Case – Black', '1759330235_EASE EC125 RGB Mid-Tower ATX Gaming Case – Black.PNG', '25,500 pkr', NULL, 10, 'Casing', NULL, 'A spacious mid-tower ATX gaming case in black, featuring RGB lighting and a design that prioritizes both aesthetics and ease of building.', 'In Stock', NULL, 'PC Component'),
(21, 'Frozer Infinity Plus ATX ARGB Gaming Case (4x ARGB Fans) - White', '1759330484_Frozer Infinity Plus ATX ARGB Gaming Case (4x ARGB Fans).PNG', '25,499 pkr', NULL, 10, 'Casing', NULL, 'Show off your build with this white ATX gaming case, featuring an infinity mirror effect and four ARGB fans for a stunning look.', 'In Stock', NULL, 'PC Component'),
(22, 'Lian Li LANCOOL II Mesh USB Type C RGB Mid-Tower Case – White', '1759330667_Lian Li LANCOOL II Mesh USB Type C RGB Mid-Tower Case – White.PNG', '29,999 pkr', NULL, 10, 'Casing', NULL, 'A high-airflow mid-tower case from Lian Li in white, featuring a full mesh front panel, RGB lighting, and a USB Type-C port for modern connectivity.', 'In Stock', NULL, 'PC Component'),
(23, 'HYTE Y40 Mid-Tower ATX Gaming Case – White', '1759331895_HYTE Y40 Mid-Tower ATX Gaming Case – White.PNG', '33,999 pkr', NULL, 10, 'Casing', NULL, 'A premium mid-tower ATX gaming case from HYTE in a beautiful white finish, known for its unique design and excellent component visibility.', 'In Stock', NULL, 'PC Component'),
(24, 'HYTE Y60 Mid-Tower ATX Gaming Case – White', '1759332062_HYTE Y60 Mid-Tower ATX Gaming Case – White.PNG', '37,999 pkr', NULL, 10, 'Casing', NULL, 'The iconic HYTE Y60 in white, this mid-tower ATX case offers a panoramic view of your components with its wrap-around tempered glass design.', 'In Stock', NULL, 'PC Component'),
(25, 'Lian Li O11 Dynamic Mini – Black', '1759332244_Lian Li O11 Dynamic Mini – Black.PNG', '34,999 pkr', NULL, 10, 'Casing', NULL, 'A compact and versatile case from Lian Li in black, supporting various motherboard sizes and offering a clean, dual-chamber layout.', 'In Stock', NULL, 'PC Component'),
(26, 'ASUS TUF Gaming GT501 EATX Gaming Case – Black', '1759332361_ASUS TUF Gaming GT501 EATX Gaming Case – Black.PNG', '39,999 PKR', NULL, 10, 'Casing', NULL, 'A rugged EATX gaming case from ASUS TUF series in black, built for durability and featuring ergonomic handles for easy transport.', 'In Stock', NULL, 'PC Component'),
(27, 'Lian Li Q58 Mini-ITX Case with PCIe 4.0 Riser Card – Black', '1759332616_Lian Li Q58 Mini-ITX Case with PCIe 4.0 Riser Card – Black.PNG', '39,999 PKR', NULL, 10, 'Casing', NULL, 'A premium mini-ITX case from Lian Li in black, perfect for small form factor enthusiasts. It includes a PCIe 4.0 riser card for vertical GPU mounting.', 'In Stock', NULL, 'PC Component'),
(28, 'Lian Li O11 Vision Compact ATX Gaming Case – Black', '1759332703_Lian Li O11 Vision Compact ATX Gaming Case – Black.PNG', '39,999 PKR', NULL, 10, 'Casing', NULL, 'A stunning black ATX gaming case from Lian Li with a pillar-less, three-sided glass view, offering an uninterrupted panoramic display of your build.', 'In Stock', NULL, 'PC Component'),
(29, 'ASUS TUF Gaming GT501 EATX Gaming Case – White', '1759333066_ASUS TUF Gaming GT501 EATX Gaming Case – White.PNG', '40,999 pkr', NULL, 10, 'Casing', NULL, 'The durable and feature-rich ASUS TUF Gaming GT501, now in a striking white finish. Perfect for large EATX builds.', 'In Stock', NULL, 'PC Component'),
(30, 'DarkFlash DQX90 Mid-Tower ATX Gaming Case – White', '1759333409_DarkFlash DQX90 Mid-Tower ATX Gaming Case – White.PNG', '43,999 pkr', NULL, 10, 'Casing', NULL, 'A unique mid-tower ATX gaming case in white, featuring a distinctive design that will make your PC the centerpiece of your setup.', 'In Stock', NULL, 'PC Component'),
(31, 'Lian Li PC O11 Dynamic Tempered Glass Mid-Tower Case – Black', '1759333561_Lian Li PC O11 Dynamic Tempered Glass Mid-Tower Case – Black.PNG', '45,999 pkr', NULL, 10, 'Casing', NULL, 'The legendary Lian Li PC O11 Dynamic in black, a mid-tower case famous for its dual-chamber design and excellent water-cooling support.', 'In Stock', NULL, 'PC Component'),
(32, 'Cooler Master MasterFrame 700 Open-Air Full Tower Gaming Case', '1759333661_Cooler Master MasterFrame 700 Open-Air Full Tower Gaming Case.PNG', '48,999 pkr', NULL, 10, 'Casing', NULL, 'An open-air full tower case for enthusiasts who want to showcase their hardware. It can be configured as a test bench or a unique vertical chassis.', 'In Stock', NULL, 'PC Component'),
(33, 'Lian Li O11 Dynamic XL ROG Certified Full Tower Case – Black', '1759334010_Lian Li O11 Dynamic XL ROG Certified Full Tower Case – Black.PNG', '66,999 pkr', NULL, 10, 'Casing', NULL, 'The larger version of the O11 Dynamic, this ROG Certified full tower case in black offers massive space for custom cooling and E-ATX motherboards.', 'In Stock', NULL, 'PC Component'),
(34, 'Lian Li O11 Dynamic EVO XL Full-Tower E-ATX Gaming Case - White', '1759334153_Lian Li O11 Dynamic EVO XL Full-Tower E-ATX Gaming Case White.PNG', '89,999 pkr', NULL, 10, 'Casing', NULL, 'An extra-large, feature-packed full-tower E-ATX case from Lian Li in white, designed for ultimate flexibility and massive builds.', 'In Stock', NULL, 'PC Component'),
(35, 'GIGABYTE AORUS C700 GLASS Full-Tower e-ATX Gaming Case – Black', '1759334546_GIGABYTE AORUS C700 GLASS Full-Tower e-ATX Gaming Case – Black.PNG', '114,999 pkr', NULL, 10, 'Casing', NULL, 'A premium full-tower e-ATX gaming case from Gigabyte AORUS, featuring tempered glass panels and integrated RGB lighting for a flagship build.', 'In Stock', NULL, 'PC Component'),
(36, 'Lian Li O11 Dynamic EVO RGB ATX Gaming Case – Automobile Lamborghini Edition', '1759334889_Lian Li O11 Dynamic EVO RGB ATX Gaming Case – Automobili Lamborghini Edition.PNG', '119,999 pkr', NULL, 10, 'Casing', NULL, 'A special edition ATX gaming case co-designed with Automobili Lamborghini, offering unparalleled style and a premium feel for the ultimate enthusiast.', 'In Stock', NULL, 'PC Component'),
(37, 'Cooler Master Cosmos C700M Full Tower E-ATX Gaming Case – Black', '1759410005_Cooler Master Cosmos C700M Full Tower E-ATX Gaming Case – Black.PNG', '129,999 pkr', NULL, 10, 'Casing', NULL, 'A highly modular full tower E-ATX case with a futuristic design, offering incredible customization options for high-end builds.', 'In Stock', NULL, 'PC Component'),
(38, 'HYTE Y70 Touch Infinite Mid-Tower ATX Gaming Case – Black', '1759410346_HYTE Y70 Touch Infinite Mid-Tower ATX Gaming Case – Black.PNG', '140,000 pkr', NULL, 10, 'Casing', NULL, 'A mid-tower ATX case that takes visuals to the next level with a massive, integrated touchscreen display on its front panel. Available in black.', 'In Stock', NULL, 'PC Component'),
(39, 'ASUS ROG Hyperion GR701 Full Tower E-ATX Gaming Case – White', '1759411398_ASUS ROG Hyperion GR701 Full Tower E-ATX Gaming Case – White.PNG', '157,999 pkr', NULL, 10, 'Casing', NULL, 'A beast of a full tower E-ATX case from ASUS ROG in white. Designed for extreme builds with top-tier cooling support and a premium finish.', 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `chat_typing`
--

CREATE TABLE `chat_typing` (
  `user_id` int(11) NOT NULL,
  `user_typing` tinyint(1) DEFAULT 0,
  `admin_typing` tinyint(1) DEFAULT 0,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_typing`
--

INSERT INTO `chat_typing` (`user_id`, `user_typing`, `admin_typing`, `last_update`) VALUES
(17, 0, 0, '2026-01-30 10:42:58'),
(21, 0, 0, '2025-12-28 08:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_message` text NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `customer_name`, `customer_email`, `customer_message`, `submission_date`) VALUES
(1, 'umair babar', 'umairbabar2021@gmail.com', 'dhanki website bana bharwe', '2025-09-15 15:07:43'),
(2, 'umair babar', 'umairbabar2021@gmail.com', 'dhanki website bana bharwe', '2025-09-15 15:09:09'),
(3, 'umair babar', 'hashim.dev07@gmail.com', '..___....._..___', '2025-09-15 15:10:59'),
(4, 'umair babar', 'hashim.dev07@gmail.com', '..___....._..___', '2025-09-15 15:11:00'),
(5, 'umair babar', 'hashim.dev07@gmail.com', '..__....___', '2025-09-15 15:20:01'),
(6, 'umair babar', 'hashim.dev07@gmail.com', '..__....___', '2025-09-15 15:21:22'),
(7, 'umair babar', 'hashim.dev07@gmail.com', '..__....___', '2025-09-15 15:24:25'),
(8, 'umair babar', 'hashim.dev07@gmail.com', '..__....___', '2025-09-15 15:25:48'),
(9, 'ayan amjad', 'hashim.dev07@gmail.com', 'ok', '2025-12-09 14:14:08'),
(10, 'ayan amjad', 'hashim.dev07@gmail.com', 'lol', '2025-12-09 14:15:43'),
(11, 'ayan amjad', 'umair@gmail.com', 'thank you soo much', '2025-12-09 14:17:10'),
(12, 'hashhim', 'hashim.dev07@gmail.com', 'kahan hain bkl', '2025-12-13 15:15:54'),
(13, 'hashhim', 'hashim.dev07@gmail.com', 'kahan hain bkl', '2025-12-13 15:32:41'),
(14, 'umair babar', 'hashim.dev07@gmail.com', 'youtube', '2025-12-28 08:21:53'),
(15, 'umair babar', 'hashim.dev07@gmail.com', 'youtube', '2025-12-28 08:22:40'),
(16, 'umair babar', 'umairbabar2021@gmail.com', 'JBAIGDUIQBDKQB', '2025-12-29 11:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `cooler`
--

CREATE TABLE `cooler` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cooler`
--

INSERT INTO `cooler` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'Thermalright Peerless Assassin 120 Digital ARGB 120mm ARGB Display CPU Air Cooler', '1758809354_Thermalright Peerless Assassin 120 Digital ARGB 120mm ARGB Display CPU Air Cooler.PNG', '15,499 pkr', NULL, 10, 'Cooler', NULL, 'A top-tier CPU air cooler featuring a digital ARGB display for real-time temperature monitoring and dual fans for exceptional cooling performance.', 'In Stock', NULL, 'PC Component'),
(2, 'EASE EAF1218 ARGB CPU Air Cooler', '1758981049_EASE EAF1218 ARGB CPU Air Cooler.png', '5,999 pkr', NULL, 10, 'Cooler', NULL, 'An affordable ARGB CPU air cooler that provides effective cooling and vibrant lighting to enhance the look of your gaming rig.', 'In Stock', NULL, 'PC Component'),
(3, 'DeepCool AG400 LED CPU Air Cooler ', '1758981162_DeepCool AG400 LED CPU Air Cooler.PNG', '6,500 pkr', NULL, 10, 'Cooler', NULL, 'A reliable and efficient CPU air cooler from DeepCool, featuring LED lighting for a touch of style. Great for entry-level to mid-range processors.', 'In Stock', NULL, 'PC Component'),
(4, 'DeepCool AK400 Digital CPU Cooler', '1758981502_DeepCool AK400 Digital CPU Cooler.png', '11,499 pkr', NULL, 10, 'Cooler', NULL, 'This DeepCool CPU cooler features a digital display to show real-time CPU stats, combining excellent cooling with modern tech aesthetics.', 'In Stock', NULL, 'PC Component'),
(5, 'EASE EAF1213 Pro CPU Cooler', '1758981636_EASE EAF1213 Pro CPU Cooler.PNG', '4,499 pkr', NULL, 10, 'Cooler', NULL, 'A budget-friendly CPU cooler that offers improved thermal performance over stock coolers, making it a great upgrade for any basic build.', 'In Stock', NULL, 'PC Component'),
(6, 'EASE EAF280 CPU Cooler', '1758981761_EASE EAF280 CPU Cooler.PNG', '1,900 pkr', NULL, 10, 'Cooler', NULL, 'A simple and effective low-profile CPU cooler, ideal for compact builds or systems where space is limited.', 'In Stock', NULL, 'PC Component'),
(7, 'DeepCool Ice Edge Mini FS V2.0 CPU Air Cooler', '1758981864_DeepCool Ice Edge Mini FS V2.0 CPU Air Cooler.PNG', '3,500 pkr', NULL, 10, 'Cooler', NULL, 'A compact and affordable air cooler from DeepCool, perfect for small form factor builds and entry-level CPUs.', 'In Stock', NULL, 'PC Component'),
(8, 'ID-Cooling SE-214-XT-ARGB CPU Air Cooler', '1758982042_ID-Cooling SE-214-XT-ARGB CPU Air Cooler.PNG', '5,999 pkr', NULL, 10, 'Cooler', NULL, 'A popular CPU air cooler known for its excellent balance of performance, price, and ARGB lighting.', 'In Stock', NULL, 'PC Component'),
(9, 'Thermalright Assassin X 120 Refined SE ARGB CPU Air Cooler', '1758982140_Thermalright Assassin X 120 Refined SE ARGB CPU Air Cooler.PNG', '6,199 pkr', NULL, 10, 'Cooler', NULL, 'An efficient ARGB CPU air cooler from Thermalright, providing great cooling performance for its size and adding a splash of color to your build.', 'In Stock', NULL, 'PC Component'),
(10, 'Frozer FR600 ARGB CPU Air Cooler', '1758982259_Frozer FR600 ARGB CPU Air Cooler.PNG', '7,499 pkr', NULL, 10, 'Cooler', NULL, 'This ARGB CPU air cooler offers solid thermal performance and bright, customizable lighting to match your gaming setup.', 'In Stock', NULL, 'PC Component'),
(11, 'Thermalright Assassin Spirit 120 Vision ARGB CPU Air Cooler', '1758982388_Thermalright Assassin Spirit 120 Vision ARGB CPU Air Cooler.PNG', '10,499 pkr', NULL, 10, 'Cooler', NULL, 'A visually stunning ARGB CPU air cooler from Thermalright, featuring a unique fan design and effective heat dissipation.', 'In Stock', NULL, 'PC Component'),
(12, 'Aerocool Mirage 5 ARGB CPU Air Cooler', '1758982670_Aerocool Mirage 5 ARGB CPU Air Cooler.png', '10,499 pkr', NULL, 10, 'Cooler', NULL, 'An ARGB CPU air cooler with a unique infinity mirror design on top, offering a stylish and futuristic look for your system.', 'In Stock', NULL, 'PC Component'),
(13, 'Thermalright Peerless Assassin 120 SE ARGB CPU Air Cooler', '1758982792_Thermalright Peerless Assassin 120 SE ARGB CPU Air Cooler.PNG', '11,999 pkr', NULL, 10, 'Cooler', NULL, 'The legendary Peerless Assassin from Thermalright, a dual-tower air cooler that offers flagship-level performance at an unbeatable price, now with ARGB.', 'In Stock', NULL, 'PC Component'),
(14, 'ID-Cooling FROZN A620 Pro SE ARGB CPU Air Cooler', '1758982914_ID-Cooling FROZN A620 Pro SE ARGB CPU Air Cooler.PNG', '12,500 pkr', NULL, 10, 'Cooler', NULL, 'A high-performance ARGB CPU air cooler designed to handle powerful processors, ensuring they stay cool under heavy loads.', 'In Stock', NULL, 'PC Component'),
(15, 'Thermalright Aqua Elite 240 V3 240mm ARGB AIO CPU Liquid Cooler', '1758983034_Thermalright Aqua Elite 240 V3 240mm ARGB AIO CPU Liquid Cooler.PNG', '13,499 pkr', NULL, 10, 'Cooler', NULL, 'A 240mm All-In-One (AIO) liquid CPU cooler from Thermalright, offering excellent cooling performance and vibrant ARGB lighting.', 'In Stock', NULL, 'PC Component'),
(17, 'DeepCool LE500 240mm LED Liquid CPU Cooler', '1758983273_DeepCool LE500 240mm LED Liquid CPU Cooler.PNG', '15,999 pkr', NULL, 10, 'Cooler', NULL, 'A 240mm AIO liquid CPU cooler from DeepCool with simple LED lighting, providing efficient liquid cooling without the complexity of RGB.', 'In Stock', NULL, 'PC Component'),
(18, 'ID-Cooling FrostFlow X 240 Lite Snow AIO Liquid CPU Cooler', '1758983393_ID-Cooling FrostFlow X 240 Lite Snow AIO Liquid CPU Cooler.PNG', '19,499 pkr', NULL, 10, 'Cooler', NULL, 'A beautiful all-white 240mm AIO liquid CPU cooler, perfect for white-themed builds, offering strong performance and aesthetics.', 'In Stock', NULL, 'PC Component'),
(19, 'DeepCool LE360 V2 360mm ARGB AIO CPU Liquid Cooler ', '1758983775_DeepCool LE360 V2 360mm ARGB AIO CPU Liquid Cooler.png', '21,999 pkr', NULL, 10, 'Cooler', NULL, 'A 360mm ARGB AIO liquid cooler from DeepCool, providing powerful cooling for high-end CPUs and customizable lighting effects.', 'In Stock', NULL, 'PC Component'),
(20, 'Thermalright Frozen Infinity 360 RGB 360mm CPU Liquid Cooler ', '1758983919_Thermalright Frozen Infinity 360 RGB 360mm CPU Liquid Cooler.PNG', '22,499 pkr', NULL, 10, 'Cooler', NULL, 'This 360mm liquid cooler features an infinity mirror pump head and RGB fans, delivering both high-performance cooling and a captivating look.', 'In Stock', NULL, 'PC Component'),
(21, 'Asus ROG Ryujin III 360 ARGB Extreme 360mm ARGB LCD CPU Liquid Cooler ', '1758984208_Asus ROG Ryujin III 360 ARGB Extreme 360mm ARGB LCD CPU Liquid Cooler.png', '114,999 pkr', NULL, 10, 'Cooler', NULL, 'The ultimate 360mm AIO from ASUS ROG, featuring a customizable LCD screen on the pump head to display system stats or custom animations.', 'In Stock', NULL, 'PC Component'),
(22, 'LIAN LI GALAHAD II LCD SL INF 360 ', '1758984304_LIAN LI GALAHAD II LCD SL INF 360.PNG', '94,999 pkr', NULL, 10, 'Cooler', NULL, 'A premium 360mm AIO from Lian Li with a customizable LCD screen and high-performance, daisy-chainable SL-INF fans for a clean, stunning look.', 'In Stock', NULL, 'PC Component'),
(23, 'Thermalright Wonder Vision 360 UB ARGB 360mm ARGB Display AIO CPU Liquid Cooler', '1758984584_Thermalright Wonder Vision 360 UB ARGB 360mm ARGB Display AIO CPU Liquid Cooler.png', '89,999 pkr', NULL, 10, 'Cooler', NULL, 'A 360mm AIO liquid cooler with a large, vibrant ARGB display on the pump head, offering amazing visuals and powerful cooling.', 'In Stock', NULL, 'PC Component'),
(24, 'GIGABYTE AORUS WATERFORCE X II 360', '1758984703_GIGABYTE AORUS WATERFORCE X II 360.PNG', '79,500 pkr', NULL, 10, 'Cooler', NULL, 'A high-performance 360mm AIO from Gigabyte AORUS, featuring a customizable LCD display and powerful fans to keep demanding CPUs in check.', 'In Stock', NULL, 'PC Component'),
(25, 'Lian Li Hydroshift LCD 360R 360mm ARGB Liquid AIO CPU Cooler', '1758984796_Lian Li Hydroshift LCD 360R 360mm ARGB Liquid AIO CPU Cooler.PNG', '74,999 pkr', NULL, 10, 'Cooler', NULL, 'This 360mm ARGB liquid cooler from Lian Li includes a customizable LCD screen, providing both a personal touch and excellent thermal management.', 'In Stock', NULL, 'PC Component'),
(26, 'DeepCool LQ360 360mm ARGB LCD CPU Liquid Cooler', '1758985044_DeepCool LQ360 360mm ARGB LCD CPU Liquid Cooler.PNG', '38,499 pkr', NULL, 10, 'Cooler', NULL, 'A 360mm AIO from DeepCool with an ARGB LCD display on the pump head, allowing you to monitor performance or add a custom flair to your build.', 'In Stock', NULL, 'PC Component'),
(27, 'MSI MPG CoreLiquid P13 360 360mm ARGB LCD AIO CPU Liquid Cooler', '1758985136_MSI MPG CoreLiquid P13 360 360mm ARGB LCD AIO CPU Liquid Cooler.png', '49,999 pkr', NULL, 10, 'Cooler', NULL, 'An MSI 360mm AIO liquid cooler featuring an ARGB LCD display, designed to deliver efficient cooling and a premium, customizable aesthetic.', 'In Stock', NULL, 'PC Component'),
(28, 'DeepCool LD360 360mm AIO ARGB Liquid CPU Cooler', '1758985238_DeepCool LD360 360mm AIO ARGB Liquid CPU Cooler.PNG', '32,999 pkr', NULL, 10, 'Cooler', NULL, 'A 360mm AIO from DeepCool that combines powerful cooling with a unique ARGB design on the pump head for a modern, stylish build.', 'In Stock', NULL, 'PC Component'),
(29, 'DeepCool LT720 360mm CPU Liquid Cooler', '1758985489_DeepCool LT720 360mm CPU Liquid Cooler.PNG', '28,999 pkr', NULL, 10, 'Cooler', NULL, 'A high-performance 360mm AIO liquid cooler from DeepCool, known for its powerful cooling capacity and distinctive multi-dimensional infinity mirror pump design.', 'In Stock', NULL, 'PC Component'),
(30, 'LIAN LI GALAHAD II TRINITY 240', '1758985604_LIAN LI GALAHAD II TRINITY 240.PNG', '34,999 pkr', NULL, 10, 'Cooler', NULL, 'A versatile 240mm AIO from Lian Li with interchangeable pump covers, allowing you to customize the look of your cooler.', 'In Stock', NULL, 'PC Component'),
(31, 'Lian Li GALAHAD 240 AIO CPU Cooler ARGB', '1758985682_Lian Li GALAHAD 240 AIO CPU Cooler ARGB.PNG', '29,999 pkr', NULL, 10, 'Cooler', NULL, 'A reliable 240mm AIO from Lian Li with bright ARGB lighting, offering a great balance of performance and aesthetics for most gaming builds.', 'In Stock', NULL, 'PC Component'),
(32, 'ID-COOLING FX240 ARGB LIQUID COOLER', '1758985816_ID-COOLING FX240 ARGB LIQUID COOLER.PNG', '19,999 pkr', NULL, 10, 'Cooler', NULL, 'A 240mm ARGB liquid cooler that provides efficient heat dissipation and customizable lighting, perfect for keeping your CPU cool and your rig looking great.', 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `cooling_fans`
--

CREATE TABLE `cooling_fans` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Cooling Fans',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cpu`
--

CREATE TABLE `cpu` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `IMAGE` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cpu`
--

INSERT INTO `cpu` (`ID`, `Name`, `Price`, `old_price`, `quantity`, `IMAGE`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'AMD Ryzen 7 9800X3D', '175,000 pkr', NULL, 10, '1760113843_AMD Ryzen 7 9800X3D.jpg', 'Processor', NULL, 'An upcoming gaming powerhouse with AMD 3D V-Cache™ technology, expected to deliver top-tier performance for the most demanding games.', 'In Stock', NULL, 'PC Component'),
(3, 'AMD Ryzen 5 7600X', '52,999 pkr', NULL, 10, '1760113293_AMD Ryzen 5 7600X.jpg', 'Processor', NULL, 'A fantastic mid-range processor with 6 cores and 12 threads, offering excellent performance for both gaming and productivity on the AM5 platform.', 'In Stock', NULL, 'PC Component'),
(4, 'AMD Ryzen 5 9600X', '85,000 pkr', NULL, 10, '1760113681_AMD Ryzen 5 9600X.jpg', 'Processor', NULL, 'The next generation of mid-range performance, this upcoming CPU is expected to bring significant improvements for mainstream gamers and creators.', 'In Stock', NULL, 'PC Component'),
(5, 'AMD Ryzen 7 7700X', '67,999 pkr', NULL, 10, '1760113757_AMD Ryzen 7 7700X.jpg', 'Processor', NULL, 'An 8-core, 16-thread CPU that offers a great balance of multi-core performance and gaming speed on the modern AM5 socket.', 'In Stock', NULL, 'PC Component'),
(6, 'AMD Ryzen 9 9950X3D', '200,000 pkr', NULL, 10, '1760114137_AMD Ryzen 9 9950X3D.jpg', 'Processor', NULL, 'The future flagship CPU, combining a high core count with AMD 3D V-Cache™ for ultimate performance in gaming and content creation.', 'In Stock', NULL, 'PC Component'),
(7, 'AMD Ryzen 5 5500 new wtith 10 months warranty', '20,000 pkr', NULL, 10, '1757086298_ryzen 5 5500.jpg', 'Processor', NULL, 'A 6-core, 12-thread processor for the AM4 platform, offering incredible value and solid performance for 1080p gaming and daily tasks.', 'In Stock', NULL, 'PC Component'),
(8, 'AMD Ryzen 7 9700X', '125,000 pkr', NULL, 10, '1760113828_AMD Ryzen 7 9700X.jpg', 'Processor', NULL, 'An upcoming 8-core CPU from AMD, poised to deliver strong performance for gamers and professionals looking for a powerful yet efficient processor.', 'In Stock', NULL, 'PC Component'),
(9, 'AMD Ryzen 5 5600X', '29,500 pkr', NULL, 10, '1760113218_AMD Ryzen 5 5600X.jpg', 'Processor', NULL, 'A legendary 6-core, 12-thread CPU for the AM4 platform, known for its strong gaming performance and overclocking potential.', 'In Stock', NULL, 'PC Component'),
(10, 'AMD Ryzen 5 5600', '19,499 pkr', NULL, 10, '1760113186_AMD Ryzen 5 5600.jpg', 'Processor', NULL, 'One of the best value CPUs ever, the Ryzen 5 5600 provides 6 cores and 12 threads of excellent performance for gaming on the AM4 platform.', 'In Stock', NULL, 'PC Component'),
(13, 'Intel Core i5-12400F', '35,500 pkr', NULL, 10, '1760114395_Intel Core i5-12400F.jpg', 'Processor', NULL, 'A great budget-friendly 6-core processor from Intel, perfect for building a capable gaming PC without breaking the bank.', 'In Stock', NULL, 'PC Component'),
(14, 'AMD Ryzen 5 3600 new with 10 months warranty', '19,499 pkr', NULL, 10, '1757085898_ryzen 5 3600.jpg', 'Processor', NULL, 'A classic 6-core, 12-thread CPU for the AM4 socket, still capable of delivering a smooth gaming experience in many modern titles.', 'In Stock', NULL, 'PC Component'),
(15, 'AMD Ryzen 5 7600', '49,999 pkr', NULL, 10, '1760113274_AMD Ryzen 5 7600.jpg', 'Processor', NULL, 'A 6-core, 12-thread AM5 processor that offers great efficiency and performance for modern gaming and productivity builds.', 'In Stock', NULL, 'PC Component'),
(16, 'Intel Core i5-14600K', '85,500 pkr', NULL, 10, '1760114791_Intel Core i5-14600K.jpg', 'Processor', NULL, 'A high-performance CPU from Intel with a mix of Performance-cores and Efficient-cores, delivering fantastic speed for gaming and multitasking.', 'In Stock', NULL, 'PC Component'),
(17, 'AMD Ryzen 7 5700X3D', '57,500 pkr', NULL, 10, '1760113719_AMD Ryzen 7 5700X3D.jpg', 'Processor', NULL, 'Bringing the power of 3D V-Cache™ to the AM4 platform, this CPU is a fantastic upgrade for gamers looking for a final boost to their system.', 'In Stock', NULL, 'PC Component'),
(18, 'Intel Core i5-14400F', '55,500 pkr', NULL, 10, '1760114770_Intel Core i5-14400F.jpg', 'Processor', NULL, 'An excellent value CPU from Intel, offering strong gaming performance with its efficient architecture.', 'In Stock', NULL, 'PC Component'),
(19, 'AMD Ryzen 9 9950X', '185,000 pkr', NULL, 10, '1760114123_AMD Ryzen 9 9950X.jpg', 'Processor', NULL, 'The upcoming flagship consumer CPU from AMD, boasting a high core count for extreme megatasking and content creation workloads.', 'In Stock', NULL, 'PC Component'),
(20, 'AMD Ryzen 5 7500F', '45,000 pkr', NULL, 10, '1760113262_AMD Ryzen 5 7500F.jpg', 'Processor', NULL, 'A budget-friendly AM5 CPU that offers a gateway to the new platform, perfect for gamers who use a dedicated graphics card.', 'In Stock', NULL, 'PC Component'),
(21, 'Intel Core Ultra 9 285K', '190,000 pkr', NULL, 10, '1760113546_Intel Core Ultra 9 285K.jpg', 'Processor', NULL, 'Intel`s next-generation flagship CPU, designed to deliver breakthrough performance for the most demanding enthusiasts and creators.', 'In Stock', NULL, 'PC Component'),
(23, 'AMD Ryzen 5 7600X3D', '52,999 pkr', NULL, 10, '1760113415_AMD Ryzen 5 7600X3D.jpg', 'Processor', NULL, 'A specialized CPU featuring AMD 3D V-Cache™ technology, designed to offer an incredible performance uplift in supported games.', 'In Stock', NULL, 'PC Component'),
(24, 'AMD Ryzen 5 5600G', '44,000 pkr', NULL, 10, '1760113205_AMD Ryzen 5 5600G.jpg', 'Processor', NULL, 'A great budget option for AM4 builds, this 6-core CPU includes integrated Radeon graphics, making it perfect for entry-level gaming without a dedicated GPU.', 'In Stock', NULL, 'PC Component'),
(25, 'Intel Core i5-13400F', '50,500 pkr', NULL, 10, '1760114502_Intel Core i5-13400F.jpg', 'Processor', NULL, 'A solid mid-range CPU from Intel, offering a good combination of cores and clock speed for a smooth gaming and desktop experience.', 'In Stock', NULL, 'PC Component'),
(26, 'Intel Core i7-12700KF', '67,500 pkr', NULL, 10, '1760114952_Intel Core i7-12700KF.jpg', 'Processor', NULL, 'An unlocked Intel Core i7 with 12 cores (8P+4E), providing excellent performance for high-refresh-rate gaming and demanding applications.', 'In Stock', NULL, 'PC Component'),
(27, 'Intel Core i5-12600KF', '51,500 pkr', NULL, 10, '1760114467_Intel Core i5-12600KF.jpg', 'Processor', NULL, 'An unlocked Intel Core i5 with 10 cores (6P+4E), offering a sweet spot of price and performance for gamers and streamers.', 'In Stock', NULL, 'PC Component'),
(29, 'AMD Ryzen 5 8500G', '51,000 pkr', NULL, 10, '1760113462_AMD Ryzen 5 8500G.jpg', 'Processor', NULL, 'A modern APU with integrated Radeon graphics and a mix of Zen 4 and Zen 4c cores, delivering great efficiency and entry-level gaming performance.', 'In Stock', NULL, 'PC Component'),
(31, 'AMD Ryzen 7 5800X3D', '55,999 pkr', NULL, 10, '1760113737_AMD Ryzen 7 5800X3D.jpg', 'Processor', NULL, 'The legendary gaming CPU that brought 3D V-Cache™ to the masses on the AM4 platform, still delivering amazing gaming performance today.', 'In Stock', NULL, 'PC Component'),
(32, 'Intel Core i3-12100F', '25,500 pkr', NULL, 10, '1760114190_Intel Core i3-12100F.jpg', 'Processor', NULL, 'An excellent entry-level 4-core, 8-thread CPU from Intel, perfect for budget gaming rigs when paired with a good GPU.', 'In Stock', NULL, 'PC Component'),
(33, 'AMD Ryzen 9 7950X', '122,000 pkr', NULL, 10, '1760113905_AMD Ryzen 9 7950X.jpg', 'Processor', NULL, 'A 16-core, 32-thread powerhouse from AMD, designed for serious content creators, developers, and streamers who need maximum multi-core performance.', 'In Stock', NULL, 'PC Component'),
(34, 'Intel Core i5-14600KF', '84,000 pkr', NULL, 10, '1760114820_Intel Core i5-14600KF.jpg', 'Processor', NULL, 'An unlocked version of the i5-14600K without integrated graphics, offering top-tier gaming performance at a competitive price point.', 'In Stock', NULL, 'PC Component'),
(36, 'Intel Core i7-14700KF', '104,500', NULL, 10, '1760115031_Intel Core i7-14700KF.jpg', 'Processor', NULL, 'An unlocked Intel Core i7 with 20 cores (8P+12E), delivering incredible performance for gaming, streaming, and content creation.', 'In Stock', NULL, 'PC Component'),
(38, 'Intel Core Ultra 7 265KF', '135,000 pkr', NULL, 10, '1760113558_Intel Core Ultra 7 265KF.jpg', 'Processor', NULL, 'A next-generation unlocked Intel Core i7, built on a new architecture to provide a leap in performance for gamers and professionals.', 'In Stock', NULL, 'PC Component'),
(40, 'Intel Core i9-14900KF', '149,500 pkr', NULL, 10, '1760113618_Intel Core i9-14900KF.jpg', 'Processor', NULL, 'Intel`s top-tier unlocked consumer CPU, featuring 24 cores (8P+16E) for extreme performance in any task imaginable.', 'In Stock', NULL, 'PC Component'),
(42, 'Intel Core i5-10400F', '29,500 pkr', NULL, 10, '1760114278_Intel Core i5-10400F.jpg', 'Processor', NULL, 'A solid 6-core, 12-thread CPU from Intel`s 10th generation, offering reliable performance for budget-conscious gamers.', 'In Stock', NULL, 'PC Component'),
(43, 'AMD Ryzen 5 2600 new with 10 months warranty', '18,000 pkr', NULL, 10, '1757085724_ryzen 5 2600.PNG', 'Processor', NULL, 'A 6-core, 12-thread CPU from AMD, offering a fantastic entry point into PC gaming on the highly accessible AM4 platform.', 'In Stock', NULL, 'PC Component'),
(45, 'Intel Core i5-13600KF', '74,500 pkr', NULL, 10, '1760114544_Intel Core i5-13600KF.jpg', 'Processor', NULL, 'An unlocked Intel Core i5 with 14 cores (6P+8E), providing excellent overclocking potential and gaming performance.', 'In Stock', NULL, 'PC Component'),
(46, 'Intel Core i7-14700F', '108,000 pkr', NULL, 10, '1760115008_Intel Core i7-14700F.jpg', 'Processor', NULL, 'A locked Intel Core i7 with 20 cores (8P+12E), delivering immense power for users who don`t need to overclock.', 'In Stock', NULL, 'PC Component'),
(48, 'AMD Ryzen 5 3600X new with 10 months warranty', '18,499 pkr', NULL, 10, '1757086210_ryzen 5 3600x.PNG', 'Processor', NULL, 'The higher-clocked version of the Ryzen 5 3600, this 6-core, 12-thread CPU offers a slight boost in performance for AM4 systems.', 'In Stock', NULL, 'PC Component'),
(50, 'Intel Core i9-12900KF', '95,500 pkr', NULL, 10, '1760115156_Intel Core i9-12900KF.jpg', 'Processor', NULL, 'An unlocked 12th Gen Intel Core i9 with 16 cores (8P+8E), delivering flagship-level performance for gaming and heavy workloads.', 'In Stock', NULL, 'PC Component'),
(51, 'Intel Core i5-13600K', '78,500 pkr', NULL, 10, '1760114523_Intel Core i5-13600K.jpg', 'Processor', NULL, 'A 14-core (6P+8E) unlocked CPU from Intel, widely considered a top choice for high-performance gaming builds.', 'In Stock', NULL, 'PC Component'),
(53, 'Intel Core Ultra 5 245K', '90,000 pkr', NULL, 10, '1760113586_Intel Core Ultra 5 245K.jpg', 'Processor', NULL, 'A next-generation unlocked Intel Core i5, designed to offer a significant performance uplift for mainstream gaming and productivity.', 'In Stock', NULL, 'PC Component'),
(54, 'Intel Core i7-13700KF', '92,500 pkr', NULL, 10, '1760114993_Intel Core i7-13700KF.jpg', 'Processor', NULL, 'An unlocked 13th Gen Intel Core i7 with 16 cores (8P+8E), providing a fantastic combination of gaming speed and multi-threaded power.', 'In Stock', NULL, 'PC Component'),
(57, 'AMD Ryzen 7 7800X3D', '95,999 pkr', NULL, 10, '1760113783_AMD Ryzen 7 7800X3D.jpg', 'Processor', NULL, 'The king of gaming CPUs, the 7800X3D leverages AMD`s 3D V-Cache™ technology to provide unmatched performance in games.', 'In Stock', NULL, 'PC Component'),
(59, 'Intel Core i5-11400F', '36,500 pkr', NULL, 10, '1760114341_Intel Core i5-11400F.jpg', 'Processor', NULL, 'A 6-core, 12-thread CPU from Intel`s 11th generation, providing reliable performance for mid-range gaming systems.', 'In Stock', NULL, 'PC Component'),
(60, 'AMD Ryzen 5 2600X new with 10 months warranty', '20,000 pkr', NULL, 10, '1757085836_ryzen 5 2600x2.png', 'Processor', NULL, 'A slightly faster version of the Ryzen 5 2600, this 6-core, 12-thread CPU is a great budget choice for AM4 builds.', 'In Stock', NULL, 'PC Component'),
(61, 'Intel Core i7-12700F', '63,500 pkr', NULL, 10, '1760114933_Intel Core i7-12700F.jpg', 'Processor', NULL, 'A locked 12th Gen Intel Core i7 with 12 cores (8P+4E), offering powerful performance for users who prefer not to overclock.', 'In Stock', NULL, 'PC Component'),
(65, 'Intel Core i3-13100F', '29,000 pkr', NULL, 10, '1760114210_Intel Core i3-13100F.jpg', 'Processor', NULL, 'A capable 4-core, 8-thread CPU from Intel`s 13th generation, making it a strong contender for budget gaming builds.', 'In Stock', NULL, 'PC Component'),
(68, 'Intel Core i7-13700F', '89,500 pkr', NULL, 10, '1760114973_Intel Core i7-13700F.jpg', 'Processor', NULL, 'A locked 13th Gen Intel Core i7 with 16 cores (8P+8E), this CPU is a productivity and gaming powerhouse.', 'In Stock', NULL, 'PC Component'),
(69, 'Intel Core i9-13900KF', '134,500 pkr', NULL, 10, '1760115195_Intel Core i9-13900KF.jpg', 'Processor', NULL, 'An unlocked 13th Gen Intel Core i9 with 24 cores (8P+16E), delivering bleeding-edge performance for enthusiasts.', 'In Stock', NULL, 'PC Component'),
(74, 'Intel Core i7-10700F', '50,000 pkr', NULL, 10, '1760114871_Intel Core i7-10700F.jpg', 'Processor', NULL, 'An 8-core, 16-thread CPU from Intel`s 10th generation, providing solid performance for gaming and multitasking.', 'In Stock', NULL, 'PC Component'),
(75, 'Intel Core i3-10100F', '19,500 pkr', NULL, 10, '1760114156_Intel Core i3-10100F.jpg', 'Processor', NULL, 'A 4-core, 8-thread CPU from Intel`s 10th generation, serving as a reliable entry point for budget PC builds.', 'In Stock', NULL, 'PC Component'),
(76, 'Intel Core i7-11700F', '60,000 pkr', NULL, 10, '1760114898_Intel Core i7-11700F.jpg', 'Processor', NULL, 'An 8-core, 16-thread CPU from Intel`s 11th generation, capable of handling modern games and applications with ease.', 'In Stock', NULL, 'PC Component'),
(78, 'Intel Core i5-10600K', '45,000 pkr', NULL, 10, '1760114292_Intel Core i5-10600K.jpg', 'Processor', NULL, 'An unlocked 6-core, 12-thread CPU from Intel`s 10th generation, offering great overclocking potential for enthusiasts.', 'In Stock', NULL, 'PC Component'),
(89, 'AMD Ryzen 5 5600X3D', '32,999 pkr', NULL, 10, '1760113230_AMD Ryzen 5 5600X3D.jpg', 'Processor', NULL, 'A special edition CPU with 3D V-Cache™, designed for the AM4 platform to deliver an exceptional boost in gaming performance.', 'In Stock', NULL, 'PC Component'),
(91, 'Intel Core i7-10700KF', '55,000 pkr', NULL, 10, '1760114885_Intel Core i7-10700KF.jpg', 'Processor', NULL, 'An unlocked 8-core, 16-thread CPU from Intel`s 10th generation, great for users looking to fine-tune their system`s performance.', 'In Stock', NULL, 'PC Component'),
(95, 'AMD Ryzen 5 1600X with 10 months warranty', '15,000 pkr', NULL, 10, '1757085008_ryzen 5 1600x.jpg', 'Processor', NULL, 'A 6-core, 12-thread processor from AMD`s first generation of Ryzen, offering excellent multi-core performance for budget builds on the AM4 socket.', 'In Stock', NULL, 'PC Component'),
(96, 'Intel Core i7-11700KF', '65,000 pkr', NULL, 10, '1760114912_Intel Core i7-11700KF.jpg', 'Processor', NULL, 'An unlocked 8-core, 16-thread CPU from Intel`s 11th generation, built for high-performance gaming and content creation.', 'In Stock', NULL, 'PC Component'),
(99, 'Intel Core Ultra 5 245KF', '88,000 pkr', NULL, 10, '1760113573_Intel Core Ultra 5 245KF.jpg', 'Processor', NULL, 'The unlocked version of the next-gen Core i5, providing a great platform for mainstream gamers who want to overclock.', 'In Stock', NULL, 'PC Component'),
(102, 'Intel Core i9-11900KF', '80,000 pkr', NULL, 10, '1760115113_Intel Core i9-11900KF.jpg', 'Processor', NULL, 'The unlocked 8-core, 16-thread flagship of Intel`s 11th generation, designed for maximum performance in gaming and productivity.', 'In Stock', NULL, 'PC Component'),
(104, 'Intel Core i9-14900F', '150,000 pkr', NULL, 10, '1760113633_Intel Core i9-14900F.jpg', 'Processor', NULL, 'The locked version of Intel`s flagship Core i9, delivering immense power with 24 cores (8P+16E) for demanding professional workloads.', 'In Stock', NULL, 'PC Component'),
(105, 'AMD Ryzen 5 7600X3D', '52,999 pkr', NULL, 10, '1760113375_AMD Ryzen 5 7600X3D.jpg', 'Processor', NULL, 'A gaming-focused CPU with AMD 3D V-Cache™ technology, designed to provide a significant performance advantage in a variety of games.', 'In Stock', NULL, 'PC Component'),
(106, 'Intel Core i5-11600KF', '48,000 pkr', NULL, 10, '1760114373_Intel Core i5-11600KF.jpg', 'Processor', NULL, 'An unlocked 6-core, 12-thread CPU from Intel`s 11th generation, a solid choice for mid-range gaming builds with overclocking in mind.', 'In Stock', NULL, 'PC Component'),
(112, 'Intel Core i9-10900KF', '90,000 pkr', NULL, 10, '1760115077_Intel Core i9-10900KF.jpg', 'Processor', NULL, 'The unlocked 10-core, 20-thread flagship of Intel`s 10th generation, offering powerful performance for high-end gaming and creation tasks.', 'In Stock', NULL, 'PC Component'),
(121, 'Intel Core i9-10900F', '105,999 pkr', NULL, 10, '1760115053_Intel Core i9-10900F.jpg', 'Processor', NULL, 'The locked 10-core, 20-thread flagship from Intel`s 10th generation, a great choice for a powerful, no-fuss workstation.', 'In Stock', NULL, 'PC Component'),
(125, 'Intel Core i9-13900F', '129,500 pkr', NULL, 10, '1760115176_Intel Core i9-13900F.jpg', 'Processor', NULL, 'A locked Intel Core i9 with 24 cores (8P+16E), providing incredible multi-threaded performance for professional applications.', 'In Stock', NULL, 'PC Component'),
(126, 'Intel Core i5-11600', '45,000 pkr', NULL, 10, '1760114358_Intel Core i5-11600.jpg', 'Processor', NULL, 'A locked 6-core, 12-thread CPU from Intel`s 11th generation, offering a good balance of performance and value for everyday users and gamers.', 'In Stock', NULL, 'PC Component'),
(127, 'Intel Core i9-11900F', '78,000 pkr', NULL, 10, '1760115098_Intel Core i9-11900F.jpg', 'Processor', NULL, 'The locked 8-core, 16-thread flagship from Intel`s 11th generation, delivering strong performance for demanding tasks.', 'In Stock', NULL, 'PC Component'),
(128, 'Intel Core i9-12900F', '105,500 pkr', NULL, 10, '1760115137_Intel Core i9-12900F.jpg', 'Processor', NULL, 'A locked 12th Gen Intel Core i9 with 16 cores (8P+8E), this CPU is a powerhouse for content creation and high-end gaming.', 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `customer_reviews`
--

CREATE TABLE `customer_reviews` (
  `id` int(11) NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `rating` int(1) NOT NULL,
  `review_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','spam') DEFAULT 'pending',
  `admin_reply` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_reviews`
--

INSERT INTO `customer_reviews` (`id`, `author_name`, `rating`, `review_text`, `created_at`, `status`, `admin_reply`) VALUES
(6, 'hashim', 4, 'good', '2025-12-26 10:37:15', 'approved', NULL),
(7, 'umair', 3, 'AVERAGE PRODUCTS', '2025-12-29 11:55:10', 'approved', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `custom_cases`
--

CREATE TABLE `custom_cases` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Customized Cases',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gaming_sets`
--

CREATE TABLE `gaming_sets` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Gaming Sets',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gpu`
--

CREATE TABLE `gpu` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gpu`
--

INSERT INTO `gpu` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`) VALUES
(1, 'ASUS ROG Astral GeForce RTX 5090 OC 32GB Graphics Card', '1758811907_Gemini_Generated_Image_fnjocvfnjocvfnjo.png', '1,299,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The absolute pinnacle of next-generation gaming. This card is designed for extreme 8K gaming, featuring a massive 32GB of VRAM and unparalleled performance.', 'In Stock', NULL),
(2, 'MSI GeForce RTX 3050 Ventus 2X 6GB OC Graphics Card', '1759412717_MSI GeForce RTX 3050 Ventus 2X 6GB OC Graphics Card.PNG', '71,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A great entry-level graphics card for 1080p gaming, featuring 6GB of VRAM and MSI\'s reliable Ventus cooling solution.', 'In Stock', NULL),
(3, 'ASUS Dual GeForce RTX 3050 6GB OC Graphics Card', '1759412940_ASUS Dual GeForce RTX 3050 6GB OC Graphics Card.PNG', '72,999 pkr', NULL, 10, 'Graphics Card', NULL, 'An efficient 6GB graphics card perfect for popular esports titles and 1080p gaming. ASUS dual-fan cooling ensures it runs cool and quiet.', 'In Stock', NULL),
(4, 'Colorful GeForce RTX 3060 NB (Battle AX) Duo V4 L-V 12GB Graphics Card', '1759413090_Colorful GeForce RTX 3060 NB (Battle AX) Duo V4 L-V 12GB Graphics Card.PNG', '94,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A popular choice for mainstream 1080p gaming, this 12GB card offers excellent performance in modern titles and great value for money.', 'In Stock', NULL),
(5, 'ZOTAC GAMING GeForce RTX 3060 Twin Edge 8GB Graphics Card', '1759413154_ZOTAC GAMING GeForce RTX 3060 Twin Edge 8GB Graphics Card.PNG', '99,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A compact 8GB graphics card, ideal for small form factor builds while still delivering a solid 1080p gaming experience.', 'In Stock', NULL),
(6, 'Zotac Gaming GeForce RTX 4060 8GB Twin Edge OC Graphics Card', '1759413214_Zotac Gaming GeForce RTX 4060 8GB Twin Edge OC Graphics Card.PNG', '104,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A modern and efficient graphics card with 8GB of VRAM, perfect for high-refresh-rate 1080p gaming with features like DLSS 3.', 'In Stock', NULL),
(7, 'Zotac Gaming GeForce RTX 5060 Twin Edge OC 8GB Graphics Card', '1759413270_Zotac Gaming GeForce RTX 5060 Twin Edge OC 8GB Graphics Card.PNG', '112,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The next generation of mainstream gaming, this 8GB card is expected to deliver a significant performance uplift for 1080p and 1440p gaming.', 'In Stock', NULL),
(8, 'Colorful iGame GeForce RTX 5060 Ultra W Duo OC 8GB Graphics Card', '1759413344_Colorful iGame GeForce RTX 5060 Ultra W Duo OC 8GB Graphics Card.PNG', '116,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A stylish white 8GB graphics card that offers excellent next-gen performance and aesthetics for any white-themed build.', 'In Stock', NULL),
(9, 'MSI GeForce RTX 4060 Ti Ventus 2X 8GB OC – Black Edition', '1759413531_MSI GeForce RTX 4060 Ti Ventus 2X 8GB OC – Black Edition.PNG', '123,500 pkr', NULL, 10, 'Graphics Card', NULL, 'A powerful 8GB graphics card designed for high-end 1080p and entry-level 1440p gaming, featuring MSI\'s dual-fan Ventus cooler.', 'In Stock', NULL),
(10, 'ASUS ROG STRIX GeForce RTX 4060 OC Edition 8GB GDDR6 – Graphics Card', '1759413689_ASUS ROG STRIX GeForce RTX 4060 OC Edition 8GB GDDR6 – Graphics Card.PNG', '124,999 pkr', NULL, 10, 'Graphics Card', NULL, 'ASUS ROG STRIX edition with 8GB of VRAM, offering premium build quality, superior cooling, and overclocked performance for a top-tier gaming experience.', 'In Stock', NULL),
(11, 'Gigabyte GeForce RTX 5060 Ti Windforce 8GB Graphics Card', '1759414036_Gigabyte GeForce RTX 5060 Ti Windforce 8GB Graphics Card.PNG', '149,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A next-generation 8GB graphics card from Gigabyte, featuring their Windforce cooling to deliver a smooth 1440p gaming experience.', 'In Stock', NULL),
(12, 'MSI GeForce RTX 5060 Ti Ventus 3X 8GB OC Graphics Card', '1759414380_MSI GeForce RTX 5060 Ti Ventus 3X 8GB OC Graphics Card.PNG', '156,999 pkr', NULL, 10, 'Graphics Card', NULL, 'This 8GB card features MSI\'s triple-fan Ventus cooler, ensuring maximum cooling performance for sustained high-end gaming.', 'In Stock', NULL),
(13, 'MSI GeForce RTX 4060 Ti Ventus 2X 16GB OC – Black Edition', '1759414630_MSI GeForce RTX 4060 Ti Ventus 2X 16GB OC – Black Edition.PNG', '164,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The 16GB version of the RTX 4060 Ti, offering more VRAM for higher resolution textures and better performance in VRAM-heavy games.', 'In Stock', NULL),
(14, 'Gigabyte GeForce RTX 5060 Ti Eagle Max OC 16GB Graphics Card', '1759414924_Gigabyte GeForce RTX 5060 Ti Eagle Max OC 16GB Graphics Card.PNG', '178,500 pkr', NULL, 10, 'Graphics Card', NULL, 'A next-generation 16GB graphics card, providing ample VRAM for high-resolution 1440p and entry-level 4K gaming.', 'In Stock', NULL),
(15, 'Zotac Gaming GeForce RTX 4070 Super Twin Edge OC 12GB Graphics Card', '1759415025_Zotac Gaming GeForce RTX 4070 Super Twin Edge OC 12GB Graphics Card.PNG', '191,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A fantastic card for 1440p gaming, the 4070 Super offers 12GB of VRAM and a significant performance boost over its predecessors.', 'In Stock', NULL),
(16, 'Zotac Gaming GeForce RTX 5070 Solid OC 12GB Graphics Card', '1759415143_Zotac Gaming GeForce RTX 5070 Solid OC 12GB Graphics Card.PNG', '204,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The next-generation 12GB card poised to be the new king of 1440p gaming, offering excellent performance and efficiency.', 'In Stock', NULL),
(17, 'Gigabyte GeForce RTX 5070 Windforce 12GB OC SFF Graphics Card', '1759415318_Gigabyte GeForce RTX 5070 Windforce 12GB OC SFF Graphics Card.PNG', '204,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A compact, small form factor (SFF) version of the next-gen 12GB card, perfect for powerful yet tiny PC builds.', 'In Stock', NULL),
(18, 'Asus Prime GeForce RTX 5070 OC 12GB Graphics Card – White Edition', '1759416243_Asus Prime GeForce RTX 5070 OC 12GB Graphics Card – White Edition.PNG', '215,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A beautiful all-white 12GB graphics card from the ASUS Prime series, combining next-gen performance with a clean and elegant design.', 'In Stock', NULL),
(19, 'MSI GeForce RTX 5070 Shadow 3X OC 12GB Graphics Card', '1759416771_MSI GeForce RTX 5070 Shadow 3X OC 12GB Graphics Card.PNG', '234,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A triple-fan 12GB graphics card from MSI\'s new Shadow series, offering robust cooling and next-generation performance for 1440p gaming.', 'In Stock', NULL),
(20, 'Asus ROG Strix GeForce RTX 5070 12GB Graphics Card', '1759416982_Asus ROG Strix GeForce RTX 5070 12GB Graphics Card.PNG', '239,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The legendary ROG Strix treatment comes to the next generation, this 12GB card offers premium overclocking, cooling, and aesthetics.', 'In Stock', NULL),
(21, 'Palit GeForce RTX 3090 Ti GameRock 24GB Graphics Card – USED', '1759499101_Palit GeForce RTX 3090 Ti GameRock 24GB Graphics Card – USED.PNG', '249,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A used, high-end 24GB graphics card from a previous generation, still capable of delivering excellent performance in 4K gaming.', 'In Stock', NULL),
(22, 'Gigabyte GeForce RTX 5070 Ti Windforce OC SFF 16GB Graphics Card', '1759499473_Gigabyte GeForce RTX 5070 Ti Windforce OC SFF 16GB Graphics Card.PNG', '299,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A compact, small form factor (SFF) version of the powerful next-gen 16GB card, perfect for high-performance Mini-ITX builds.', 'In Stock', NULL),
(23, 'Asus Prime Radeon RX 9070 XT 16GB OC Graphics Card', '1759499667_Asus Prime Radeon RX 9070 XT 16GB OC Graphics Card.PNG', '299,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A 16GB graphics card from AMD\'s next generation, designed to compete at the high-end for smooth 1440p and 4K gaming.', 'In Stock', NULL),
(24, 'Gigabyte GeForce RTX 5070 Ti Eagle OC ICE SFF 16GB Graphics Card', '1759499974_Gigabyte GeForce RTX 5070 Ti Eagle OC ICE SFF 16GB Graphics Card.PNG', '337,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A stunning all-white \"ICE\" edition of the next-gen 16GB card, perfect for building a powerful and aesthetically pleasing SFF PC.', 'In Stock', NULL),
(25, 'Asus ROG Strix GeForce RTX 5070 Ti 16GB OC Graphics Card', '1759500221_Asus ROG Strix GeForce RTX 5070 Ti 16GB OC Graphics Card.PNG', '355,000 pkr', NULL, 10, 'Graphics Card', NULL, 'The premium ROG Strix version of the next-gen 16GB card, delivering maximum overclocked performance and superior cooling.', 'In Stock', NULL),
(26, ' MSI GeForce RTX 5070 Ti Gaming Trio 16GB OC Graphics Card', '1759500403_MSI GeForce RTX 5070 Ti Gaming Trio 16GB OC Graphics Card.PNG', '329', NULL, 10, 'Graphics Card', NULL, 'MSI\'s Gaming Trio cooler on a next-gen 16GB card, offering a perfect balance of powerful cooling, quiet operation, and sleek design.', 'In Stock', NULL),
(27, 'Asus Prime GeForce RTX 5070 Ti 16GB OC Graphics Card', '1759500500_Asus Prime GeForce RTX 5070 Ti 16GB OC Graphics Card.PNG', '319,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The ASUS Prime edition of the next-gen 16GB card, providing a clean design and reliable performance for high-end gaming.', 'In Stock', NULL),
(28, 'Gigabyte GeForce RTX 5080 Gaming OC 16GB Graphics Card', '1759500657_Gigabyte GeForce RTX 5080 Gaming OC 16GB Graphics Card.PNG', '424,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A high-end 16GB graphics card from the next generation, designed to deliver a breathtaking 4K gaming experience.', 'In Stock', NULL),
(29, 'Zotac Gaming GeForce RTX 5080 Solid OC 16GB Graphics Card – White', '1759500728_Zotac Gaming GeForce RTX 5080 Solid OC 16GB Graphics Card – White.PNG', '415,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A stylish white version of the powerful next-gen 16GB card, offering elite 4K performance with a clean aesthetic.', 'In Stock', NULL),
(30, 'Zotac Gaming GeForce RTX 5080 AMP Extreme Infinity 16GB Graphics Card', '1759500868_Zotac Gaming GeForce RTX 5080 AMP Extreme Infinity 16GB Graphics Card.PNG', '449,500 pkr', NULL, 10, 'Graphics Card', NULL, 'Zotac\'s flagship AMP Extreme edition of the next-gen 16GB card, featuring massive cooling and maximum overclocking potential for enthusiasts.', 'In Stock', NULL),
(31, 'Colorful iGame GeForce RTX 5080 Vulcan OC 16GB Graphics Card – Black', '1759500973_Colorful iGame GeForce RTX 5080 Vulcan OC 16GB Graphics Card – Black.PNG', '468,000 pkr', NULL, 10, 'Graphics Card', NULL, 'Colorful\'s top-tier Vulcan edition of the next-gen 16GB card, known for its large LCD screen and extreme performance.', 'In Stock', NULL),
(32, 'Colorful iGame GeForce RTX 5080 Vulcan W OC 16GB Graphics Card', '1759501035_Colorful iGame GeForce RTX 5080 Vulcan W OC 16GB Graphics Card.PNG', '469,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The beautiful white version of the Vulcan, this 16GB card combines extreme next-gen performance with a unique and customizable aesthetic.', 'In Stock', NULL),
(33, 'MSI GeForce RTX 5080 Suprim Liquid SOC 16GB Graphics Card', '1759501307_MSI GeForce RTX 5080 Suprim Liquid SOC 16GB Graphics Card.PNG', '519,999 pkr', NULL, 10, 'Graphics Card', NULL, 'MSI\'s Suprim Liquid edition features a hybrid cooling solution, using both a fan and a liquid cooler to achieve maximum performance from this 16GB card.', 'In Stock', NULL),
(34, 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X – USED', '1759501495_ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X – USED.PNG', '659,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A used ROG Strix 4090, the 24GB king of the previous generation, still offering incredible performance for 4K and even 8K gaming.', 'In Stock', NULL),
(35, 'ASUS ROG Strix LC GeForce RTX 4090 24GB OC Edition GDDR6X – USED', '1759501549_ASUS ROG Strix LC GeForce RTX 4090 24GB OC Edition GDDR6X – USED.PNG', '735,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A used, liquid-cooled version of the ROG Strix 4090, providing the ultimate in cooling and performance from the 24GB powerhouse.', 'In Stock', NULL),
(36, 'Zotac Gaming GeForce RTX 5090 Solid OC 32GB Graphics Card', '1759501620_Zotac Gaming GeForce RTX 5090 Solid OC 32GB Graphics Card.PNG', '864,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The next-generation gaming flagship with a massive 32GB of VRAM, designed for uncompromising performance in the most demanding titles at 4K and beyond.', 'In Stock', NULL),
(37, 'MSI GeForce RTX 5090 Ventus 3X OC 32GB Graphics Card', '1759501727_MSI GeForce RTX 5090 Ventus 3X OC 32GB Graphics Card.PNG', '949,000 pkr', NULL, 10, 'Graphics Card', NULL, 'MSI\'s Ventus edition of the 32GB flagship, providing a solid triple-fan cooling solution to handle its immense power.', 'In Stock', NULL),
(38, 'MSI GeForce RTX 5090 Gaming Trio 32GB Graphics Card', '1759501863_MSI GeForce RTX 5090 Gaming Trio 32GB Graphics Card.PNG', '949,000 pkr', NULL, 10, 'Graphics Card', NULL, 'The Gaming Trio version of the 32GB flagship, offering a balanced design with excellent cooling, low noise, and a sleek look.', 'In Stock', NULL),
(39, 'Zotac Gaming GeForce RTX 5090 AMP Extreme Infinity 32GB Graphics Card', '1759501937_Zotac Gaming GeForce RTX 5090 AMP Extreme Infinity 32GB Graphics Card.PNG', '999,999 pkr', NULL, 10, 'Graphics Card', NULL, 'Zotac\'s flagship AMP Extreme edition of the 32GB monster, built for enthusiasts who want to push their hardware to the absolute limit.', 'In Stock', NULL),
(40, 'MSI GeForce RTX 5090 Suprim SOC 32GB Graphics Card', '1759502147_MSI GeForce RTX 5090 Suprim SOC 32GB Graphics Card.PNG', '1,069,000 pkr', NULL, 10, 'Graphics Card', NULL, 'MSI\'s premium Suprim edition of the 32GB flagship, featuring a sophisticated design, top-tier components, and powerful, quiet cooling.', 'In Stock', NULL),
(41, 'Gigabyte Aorus GeForce RTX 5090 Master 32GB Graphics Card', '1759502280_Gigabyte Aorus GeForce RTX 5090 Master 32GB Graphics Card.PNG', '1,229,999 pkr', NULL, 10, 'Graphics Card', NULL, 'The Aorus Master edition of the 32GB flagship, featuring a massive cooler, LCD edge view, and factory overclock for enthusiast-level performance.', 'In Stock', NULL),
(42, 'ASUS ROG Astral LC GeForce RTX 5090 32GB OC Graphics Card', '1759502402_ASUS ROG Astral LC GeForce RTX 5090 32GB OC Graphics Card.PNG', '1,490,000 pkr', NULL, 10, 'Graphics Card', NULL, 'The ultimate version of the 32GB flagship from ASUS, featuring a liquid cooling solution for maximum performance and stunning aesthetics.', 'In Stock', NULL),
(43, 'Gigabyte Aorus GeForce RTX 5090 Xtreme Waterforce 32GB Graphics Card – Black', '1759502535_Gigabyte Aorus GeForce RTX 5090 Xtreme Waterforce 32GB Graphics Card – Black.PNG', '1,450,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A custom water-cooled edition of the 32GB flagship from Aorus, designed for integration into full custom loop systems for the best possible cooling.', 'In Stock', NULL),
(44, 'Dataland RX 590 GME 8GB GDDR5 Graphics Card - USED', '1759502794_Dataland RX 590 GME used A+ Condition without Box in 14 days Warranty.PNG', '29,500 pkr', NULL, 10, 'Graphics Card', NULL, 'A used 8GB graphics card that offers excellent value for 1080p gaming, capable of running many popular esports and AAA titles smoothly.', 'In Stock', NULL),
(45, 'Sapphire Nitro+ RX 580 8GB Graphics Card - USED', '1759502919_Sapphire Nitro+ RX 580 8GB used no box in 2 Weeks warranty.PNG', '28,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A legendary used 8GB graphics card, the Sapphire Nitro+ RX 580 is a workhorse for 1080p gaming, known for its reliability and strong performance.', 'In Stock', NULL),
(46, 'MSI GeForce GTX 1060 6GB GDRR5, 192-bit Graphics Card ', '1759503229_msi geforce gtx 1060 6gb.PNG', '35,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A classic 6GB graphics card that remains a popular choice for budget 1080p gaming, delivering a solid experience in many titles.', 'In Stock', NULL),
(47, 'Sapphire PULSE RX 5600 XT 6GB GDDR6 used Graphics Cardd', '1759503318_Sapphire PULSE RX 5600 XT 6GB GDDR6 used.PNG', '41,500 pkr', NULL, 10, 'Graphics Card', NULL, 'A used 6GB graphics card that punches above its weight, offering fantastic 1080p performance that rivals more expensive cards.', 'In Stock', NULL),
(48, ' Nvidia GeForce Colorful GTX 1660 Super 6GB Graphics Card - USED', '1759504873_Nvidia GeForce Colorful GTX 1660 Super 6GB used.PNG', '43', NULL, 10, 'Graphics Card', NULL, 'The king of budget 1080p gaming, this used 6GB card is highly sought after for its incredible price-to-performance ratio.', 'In Stock', NULL),
(49, 'Sapphire PULSE RX 5700 8GB GDDR6 Graphics Card - USED', '1759505035_Sapphire PULSE RX 5700 8GB GDDR6 Graphics Card - USED.PNG', '44,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A used 8GB graphics card from AMD, providing a strong 1080p and entry-level 1440p gaming experience.', 'In Stock', NULL),
(50, 'XFX RX 5700 XT RAW II Ultra Graphics Card - USED', '1759505214_XFX RX 5700 XT RAW II Ultra Boxed Used.PNG', '50,000 pkr', NULL, 10, 'Graphics Card', NULL, 'The factory-overclocked version of the RX 5700, this used 8GB card delivers excellent performance for high-refresh-rate 1080p and solid 1440p gaming.', 'In Stock', NULL),
(51, 'Gigabyte GeForce RTX 2060 Super 8GB Graphics Card - USED', '1759505573_Gigabyte GeForce RTX 2060 Super 6GB Graphics Card - USED.PNG', '65,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A used 8GB card with ray tracing capabilities, offering a great entry point into modern graphical features and strong 1080p performance.', 'In Stock', NULL),
(52, 'Sapphire PULSE RX 6600 8GB GDDR6 Graphics Card - USED', '1759505692_Sapphire PULSE RX 6600 8GB GDDR6 Used.PNG', '50,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A modern and highly efficient used 8GB graphics card, perfect for maxed-out 1080p gaming with excellent power consumption.', 'In Stock', NULL),
(53, 'ASRock Challenger RX 6600 XT 8GB GDDR6 Dual Fan Graphics Card - USED', '1759505829_ASRock Challenger RX 6600 XT 8GB GDDR6 Dual Fan Graphics Card - USED.PNG', '59,500 pkr', NULL, 10, 'Graphics Card', NULL, 'The more powerful XT version of the RX 6600, this used 8GB card provides a fantastic high-refresh-rate 1080p gaming experience.', 'In Stock', NULL),
(54, 'Gigabyte Gaming OC 8G RX 6600 XT 8GB GDDR6 Graphics Card - USED', '1759506049_Gigabyte Gaming OC 8G RX 6600 XT 8GB GDDR6.PNG', '62,500 PKR', NULL, 10, 'Graphics Card', NULL, 'Gigabyte\'s triple-fan version of the RX 6600 XT, this used 8GB card runs cool and quiet while delivering top-tier 1080p performance.', 'In Stock', NULL),
(55, 'XFX SWFT 210 RX 6650 XT 8GB GDDR6 Graphics Card - USED', '1759506157_XFX SWFT 210 RX 6650 XT 8GB GDDR6.PNG', '75,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A refresh of the RX 6600 series, this used 8GB card offers slightly better performance for a dominant 1080p gaming experience.', 'In Stock', NULL),
(56, 'Sapphire PULSE RX 7600 8GB GDDR6 Graphics Card - USED', '1759506308_Sapphire PULSE RX 7600 8GB GDDR6.PNG', '92,500 PKR', NULL, 10, 'Graphics Card', NULL, 'A current-generation used 8GB card, delivering exceptional 1080p performance with modern features and efficiency.', 'In Stock', NULL),
(57, 'Amd XFX SWFT RX 6700 10GB Graphics Card - USED', '1759506424_Amd XFX SWFT RX 6700 10GB Graphics Card - USED.PNG', '68,500 PKR', NULL, 10, 'Graphics Card', NULL, 'This used 10GB card is a hidden gem for 1440p gaming, offering incredible performance and value for its price.', 'In Stock', NULL),
(58, 'GIGABYTE RADEON RX 6700 XT 12GB Graphics Card - USED', '1759506632_RX 6700 XT 12GB Graphics Card.PNG', '85,999 pkr', NULL, 10, 'Graphics Card', NULL, 'A very popular used 12GB card, the RX 6700 XT is a powerhouse for 1440p gaming, easily handling modern titles at high settings.', 'In Stock', NULL),
(59, 'SAPPHIRE PULSE AMD Radeon RX 6650XT GAMING OC 8GB GDDR6 Graphics Card - USED', '1759506785_SAPPHIRE PULSE AMD Radeon™ RX 6650XT GAMING OC 8GB GDDR6 Graphics Card.PNG', '78,500 PKR', NULL, 10, 'Graphics Card', NULL, 'A slightly faster version of the RX 6650 XT, this used 8GB card is an excellent choice for competitive 1080p gaming.', 'In Stock', NULL),
(60, 'XFX QICK RX 6750 XT 12GB GDDR6 Graphics Card  - USED', '1759507023_XFX QICK RX 6750 XT 12GB GDDR6 used.PNG', '90,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A refresh of the RX 6700 XT, this used 12GB card offers a boost in performance for an even smoother 1440p gaming experience.', 'In Stock', NULL),
(61, 'XFX Speedster SWFT 319 RX 6800 XT 16GB GDDR6 Graphics Card - USED ', '1759507175_XFX Speedster SWFT 319 RX 6800 XT 16GB GDDR6.PNG', '115,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A used high-end 16GB graphics card, the RX 6800 XT is perfect for 1440p and entry-level 4K gaming, offering a massive amount of VRAM.', 'In Stock', NULL),
(62, 'Msi Nvidia Geforce GTX 970 4GB 256BIT GDDR5 Graphics Card - USED', '1759512041_Msi Nvidia Geforce Gtx 970m.png', '31,000', NULL, 10, 'Graphics Card', NULL, 'An older generation 4GB graphics card, suitable for light 1080p gaming and esports titles on a tight budget.', 'In Stock', NULL),
(63, 'ASRock Challenger RX 9060 XT 8GB OC Graphics Card ', '1759586142_ASRock Challenger RX 9060 XT 8GB OC.PNG', '108,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A next-generation 8GB card from AMD, designed to deliver excellent performance for mainstream 1080p and 1440p gaming.', 'In Stock', NULL),
(64, 'XFX SWFT 319 RX 6900 XT 16GB GDDR6 Graphics Card  - USED', '1759586333_XFX SWFT 319 RX 6900 XT 16GB GDDR6.PNG', '159,000 PKR', NULL, 10, 'Graphics Card', NULL, 'Formerly a flagship card, this used 16GB beast offers incredible performance for 1440p and 4K gaming, rivaling many modern GPUs.', 'In Stock', NULL),
(65, 'ASRock Challenger RX 7600 XT 16GB OC Graphics Card ', '1759586614_ASRock Challenger RX 7600 XT 16GB OC.PNG', '105,999 PKR', NULL, 10, 'Graphics Card', NULL, 'The 16GB version of the RX 7600, providing more VRAM for better performance at higher resolutions and texture settings.', 'In Stock', NULL),
(66, 'Gigabyte RX 7700 XT Gaming OC 12GB Graphics Card - USED', '1759586864_Gigabyte RX 7700 XT Gaming OC 12GB Graphics Card - USED.PNG', '140,000 PKR', NULL, 10, 'Graphics Card', NULL, 'A used 12GB card from the current generation, offering fantastic performance for high-refresh-rate 1440p gaming.', 'In Stock', NULL),
(67, 'Sapphire PULSE RX 7700 XT 12GB GDDR6 Graphics Card - USED', '1759587017_Sapphire PULSE RX 7700 XT 12GB GDDR6 Graphics Card - USED.PNG', '150,000 PKR', NULL, 10, 'Graphics Card', NULL, 'Sapphire\'s popular PULSE edition of the RX 7700 XT, this used 12GB card is a great choice for a cool, quiet, and powerful 1440p build.', 'In Stock', NULL),
(68, 'Sapphire PULSE RX 7800 XT 16GB GDDR6 Graphics Card', '1759587167_Sapphire PULSE RX 7800 XT 16GB GDDR6 Graphics Card.PNG', '170,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A current-gen 16GB card that hits the sweet spot for 1440p and 4K gaming, offering amazing performance and value.', 'In Stock', NULL),
(69, 'SAPPHIRE Nitro+ RX 7800 XT 16GB GDDR6 Graphics Card', '1759587313_SAPPHIRE Nitro+ RX 7800 XT 16GB GDDR6 Graphics Card.PNG', '175,000 pkr', NULL, 10, 'Graphics Card', NULL, 'The premium Nitro+ version of the RX 7800 XT, this 16GB card features enhanced cooling and a factory overclock for maximum performance.', 'In Stock', NULL),
(70, 'AMD XFX Radeon RX 7900 XT 20GB Graphics Card ', '1759587523_AMD XFX Radeon RX 7900 XT 20GB Graphics Card.PNG', '230,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A high-end 20GB graphics card from AMD, designed for a premium 4K gaming experience with plenty of VRAM for future titles.', 'In Stock', NULL),
(71, 'Sapphire PULSE RX 7900 GRE 16GB GDDR6 Graphics Card - USED', '1759587679_Sapphire PULSE RX 7900 GRE 16GB GDDR6.PNG', '155,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A used 16GB card that offers performance close to the RX 7800 XT, making it an excellent value proposition for high-end gaming.', 'In Stock', NULL),
(72, 'XFX QuickSilver AMD Radeon RX 9070 GRE OC White Gaming Edition Graphics Card', '1759587833_XFX QuickSilver AMD Radeon RX 9070 OC White Gaming Edition.PNG', '182,500 pkr', NULL, 10, 'Graphics Card', NULL, 'A special white edition of AMD\'s next-gen lineup, this card offers a unique aesthetic and strong gaming performance.', 'In Stock', NULL),
(73, 'Asus Tuf Gaming Radeon RX 7900 XTX OC Edition 24GB GDDR6 Graphics Card', '1759588062_Asus Tuf Gaming Radeon RX 7900 XTX OC Edition 24GB GDDR6 Graphics Card.PNG', '314,999 PKR', NULL, 10, 'Graphics Card', NULL, 'AMD\'s flagship 24GB gaming card, the 7900 XTX delivers top-tier performance for a no-compromise 4K gaming experience. This TUF edition ensures robust cooling.', 'In Stock', NULL),
(74, 'ASRock AMD Radeon RX 7900 XTX Taichi White 24GB OC Graphics Card', '1759588141_ASRock AMD Radeon RX 7900 XTX Taichi White 24GB OC Graphics Card.PNG', '379,999 PKR', NULL, 10, 'Graphics Card', NULL, 'A premium, all-white version of the 24GB flagship from ASRock\'s Taichi series, featuring a massive cooler and beautiful design for ultimate performance.', 'In Stock', NULL),
(75, 'Amd Radeon PowerColor REAPER RX 9070 XT 16GB GDDR6 Graphics Card ', '1759588341_Amd Radeon PowerColor REAPER Radeon RX 9070 XT 16GB GDDR6 Graphics Card.PNG', '242,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A next-generation 16GB card from PowerColor\'s REAPER series, expected to deliver powerful performance for high-end gaming.', 'In Stock', NULL),
(76, 'XFX Swift Radeon RX 9060 XT 16GB Tri-Fan Graphics Card ', '1759588509_XFX Swift Radeon RX 9060 XT 16GB Tri-Fan Graphics Card.PNG', '145,000 pkr', NULL, 10, 'Graphics Card', NULL, 'A triple-fan version of AMD\'s next-gen 16GB card, ensuring excellent cooling to maintain peak performance during long gaming sessions.', 'In Stock', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `handsfree`
--

CREATE TABLE `handsfree` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Handsfree',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hdd`
--

CREATE TABLE `hdd` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hdd`
--

INSERT INTO `hdd` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, '1 TB HDD Usd mix brands(1month warranty)', '1758726321_1tb hdd.PNG', '5,500 pkr', NULL, 10, 'Hdd', NULL, 'A 1TB hard drive offering ample storage space for your games, media, and documents. A cost-effective way to expand your PC\'s capacity.', 'In Stock', NULL, 'PC Component'),
(2, '500 GB HDD Used mix brands(1month waranty)', '1758728329_500gb hdd.PNG', '2,000 PKR', NULL, 10, 'Hdd', NULL, 'A 500GB hard drive perfect for storing essential files or as a secondary drive for backups. An affordable storage solution.', 'In Stock', NULL, 'PC Component'),
(3, '2 TB HDD New with 1 year warrant', '1758728583_2tb hdd.PNG', '19,999 pkr', NULL, 10, 'Hdd', NULL, 'A brand new 2TB hard drive providing a large amount of storage for extensive game libraries, movie collections, and project files.', 'In Stock', NULL, 'PC Component'),
(4, '4 TB HDD New with 1 year warranty', '1758728717_4tb hdd.PNG', '27,999 pkr', NULL, 10, 'Hdd', NULL, 'A spacious 4TB hard drive designed for users who need massive storage capacity for high-resolution media, backups, and large applications.', 'In Stock', NULL, 'PC Component'),
(5, '6 TB WD RED PLUS HARD DISK ', '1758728901_6tb hdd.PNG', '52,999 pkr', NULL, 10, 'Hdd', NULL, 'A 6TB hard drive from WD\'s RED PLUS series, specifically designed for reliability in NAS (Network Attached Storage) environments, 24/7 operation.', 'In Stock', NULL, 'PC Component'),
(6, '8 TB Seagate SKYHAWK HARD DISK ', '1758729543_8tb hdd.PNG', '74,999 pkr', NULL, 10, 'Hdd', NULL, 'An 8TB hard drive from Seagate\'s SKYHAWK series, optimized for surveillance systems to handle continuous video recording workloads.', 'In Stock', NULL, 'PC Component'),
(7, 'WD Purple 10 TB Hard disk', '1758805410_10tb hdd.PNG', '80,000 pkr', NULL, 10, 'Hdd', NULL, 'A 10TB hard drive from WD\'s Purple series, engineered for the demands of 24/7 surveillance recording systems.', 'In Stock', NULL, 'PC Component'),
(8, 'WD ULTRASTAR DC HC520 12TB 3.5 Hard Disk', '1758805566_12tb hdd.PNG', '85,999 pkr', NULL, 10, 'Hdd', NULL, 'A 12TB enterprise-grade hard drive designed for data centers, offering maximum capacity and reliability for critical business applications.', 'In Stock', NULL, 'PC Component'),
(9, 'WD RED PRO 24TB 3.5 NAS Hard Disk', '1758805701_24 tb hdd.PNG', '127,999 pkr', NULL, 10, 'Hdd', NULL, 'A massive 24TB hard drive from WD\'s RED PRO series, built for high-performance and reliability in demanding, large-scale NAS systems.', 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `headsets`
--

CREATE TABLE `headsets` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Headsets',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `device_info` varchar(255) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `user_id`, `device_info`, `ip_address`, `login_time`) VALUES
(3, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-15 16:37:36'),
(11, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-16 12:39:02'),
(16, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-16 13:20:06'),
(27, 16, 'Linux (Chrome)', '192.168.1.106', '2025-12-17 19:00:27'),
(30, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-18 15:37:44'),
(35, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-19 22:36:10'),
(53, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-21 14:55:58'),
(59, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-24 13:17:49'),
(61, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-24 13:36:44'),
(62, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-24 13:37:26'),
(64, 21, 'Android (Chrome)', '192.168.1.115', '2025-12-24 13:41:14'),
(67, 16, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-24 15:56:15'),
(72, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-26 10:31:37'),
(77, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-28 08:08:46'),
(80, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2025-12-29 12:00:52'),
(88, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-05 12:37:20'),
(89, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-05 12:37:55'),
(90, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-05 16:46:14'),
(91, 21, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-05 16:48:04'),
(92, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-05 16:48:46'),
(93, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-09 11:38:14'),
(94, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-22 23:50:36'),
(95, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-30 10:40:23'),
(96, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-01-30 10:45:49'),
(97, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-02-04 03:48:59'),
(98, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-02-07 06:18:51'),
(99, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-02-09 11:55:26'),
(100, 17, 'Windows (Chrome)', 'Localhost (Your PC)', '2026-03-05 06:43:05');

-- --------------------------------------------------------

--
-- Table structure for table `mobo`
--

CREATE TABLE `mobo` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `socket` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mobo`
--

INSERT INTO `mobo` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `socket`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'ASRock A320M-HDV R4.0', '1760011267_ASRock A320M-HDV R4.png.png', '17,500 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / White', 'An entry-level AM4 motherboard, perfect for budget builds with Ryzen processors. It provides all the essential features to get you started.', 'In Stock', NULL, 'PC Component'),
(2, 'ASRock A620M Pro RS WiFi', '1760011305_ASRock A620M Pro RS WiFi.png', '50,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'A modern AM5 motherboard with built-in WiFi, offering a feature-packed yet affordable entry point to the latest AMD Ryzen 7000 series CPUs.', 'In Stock', NULL, 'PC Component'),
(3, 'ASRock B450M-HDV R4.0', '1760011349_ASRock B450M-HDV R4.0.png', '63,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / White', 'A solid and reliable AM4 motherboard, great for budget gaming builds. It offers the core features needed for a stable and efficient system.', 'In Stock', NULL, 'PC Component'),
(4, 'ASRock B650 PG LIGHTNING', '1760011401_ASRock B650 PG LIGHTNING.png', '80,500 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', 'An ATX motherboard for the AM5 platform, featuring PCIe 5.0 support and a strong power delivery system for high-performance Ryzen CPUs.', 'In Stock', NULL, 'PC Component'),
(6, 'ASRock B650 Pro RS WiFi', '1760011924_ASRock B650 Pro RS WiFi.png', '58,500 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'This AM5 motherboard combines a stylish design with the convenience of built-in WiFi, making it a great choice for a clean and modern build.', 'In Stock', NULL, 'PC Component'),
(7, 'ASRock B650 Steel Legend WiFi', '1760012039_ASRock B650 Steel Legend WiFi.png', '64,500 pkr', NULL, 10, 'MOBO', 'AM5', 'White / Silver', 'A premium AM5 motherboard with a striking white and silver camouflage design, built with high-quality components for stability and overclocking.', 'In Stock', NULL, 'PC Component'),
(8, 'ASRock B650E PG-ITX WIFI', '1760015728_ASRock B650E PG-ITX WIFI.png', '81,999 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Red', 'A high-end Mini-ITX motherboard for the AM5 platform, packed with features like PCIe 5.0 and WiFi for a no-compromise small form factor build.', 'In Stock', NULL, 'PC Component'),
(9, 'ASRock B650I Lightning Wifi', '1760015781_ASRock B650I Lightning Wifi.png', '99,500 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', 'A compact Mini-ITX AM5 motherboard with WiFi, offering a powerful foundation for a small yet mighty gaming PC.', 'In Stock', NULL, 'PC Component'),
(10, 'ASRock B650M PG Lightning', '1760015832_ASRock B650M PG Lightning.png', '80,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'A Micro-ATX motherboard for the AM5 platform, providing essential features and reliable performance for a compact and modern PC build.', 'In Stock', NULL, 'PC Component'),
(11, 'ASRock B650M PG Lightning Wifi', '1760015956_ASRock B650M PG Lightning Wifi.png', '67,999 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'This Micro-ATX AM5 motherboard includes WiFi, offering great connectivity and performance for a compact gaming or productivity system.', 'In Stock', NULL, 'PC Component'),
(12, 'ASRock B650M PG RIPTIDE WIFI', '1760015988_ASRock B650M PG RIPTIDE WIFI.png', '61,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', 'A feature-rich Micro-ATX AM5 motherboard from the PG RIPTIDE series, designed for gamers with features like fast networking and robust power delivery.', 'In Stock', NULL, 'PC Component'),
(15, 'ASRock B650M Pro X3D WiFi', '1760016109_ASRock B650M Pro X3D WiFi.png', '38,500 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', 'A specialized Micro-ATX AM5 motherboard optimized to unleash the full potential of AMD\'s X3D gaming processors.', 'In Stock', NULL, 'PC Component'),
(16, 'ASRock B650M-H/M.2+', '1760016168_ASRock B650M-H.jpg', '32,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'A budget-friendly Micro-ATX motherboard for the AM5 platform, providing the essential features needed for a modern PC.', 'In Stock', NULL, 'PC Component'),
(17, 'ASRock B650M-HDV/M.2', '1760016231_ASRock B650M-HDV.jpg', '38,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', 'An entry-level Micro-ATX AM5 motherboard that offers a stable and reliable foundation for the latest generation of AMD processors.', 'In Stock', NULL, 'PC Component'),
(18, 'ASRock B660M-HDV', '1760016411_ASRock B660M-HDV.png', '32,000 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Gray / Black', 'A Micro-ATX motherboard for Intel 12th/13th Gen CPUs, offering a basic but reliable platform for budget-conscious builders.', 'In Stock', NULL, 'PC Component'),
(53, 'Asus PRIME A320M-K', '1760106202_asus prime a320m-k.jpg', '17,500', NULL, 10, 'MOBO', 'AM4', 'Black / White', NULL, 'In Stock', NULL, 'PC Component'),
(54, 'Asus PRIME A520M-K', '1760106251_asus prime a520m-k.jpg', '20,500 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(55, 'Asus PRIME B450M-K II', '1760106276_asus prime B450m-k II.jpg', '25,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(56, 'Asus PRIME B550M-K', '1760106296_asus prime B550m-K.jpg', '32,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / White', NULL, 'In Stock', NULL, 'PC Component'),
(57, 'Asus PRIME B560M-A', '1760109223_asus prime B560m-a.jpg', '35,000 pkr', NULL, 10, 'MOBO', 'LGA1200', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(59, 'Asus PRIME B650-PLUS WIFI', '1760109288_Asus PRIME B650-PLUS WIFI.jpg', '59,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(61, 'Asus PRIME B650M-A WIFI II', '1760109354_Asus PRIME B650M-A WIFI II.jpg', '58,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(62, 'Asus PRIME B650M-K', '1760109381_asus prime B650m-k.jpg', '53,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(64, 'Asus PRIME H510M-A', '1760109398_asus prime H510m-a.jpg', '26,000 pkr', NULL, 10, 'MOBO', 'LGA1200', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(65, 'Asus PRIME H510M-K', '1760109413_asus prime H510m-k.jpg', '22,000 pkr', NULL, 10, 'MOBO', 'LGA1200', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(66, 'Asus PRIME H610M-K D4', '1760109470_Asus PRIME H610M-K D4.jpg', '28,000 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(68, 'Asus PRIME X670E-PRO WIFI', '1760110387_Asus PRIME X670E-PRO WIFI.webp', '95,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(70, 'Asus PRIME X870-P WIFI', '1760110407_asus prime x870-p wifi.jpg', '85,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(71, 'Asus PRIME Z790-P WIFI', '1760110429_asus prime z790-p wifi.jpg', '72,000 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(72, 'Asus PRIME Z890-P WIFI', '1760110465_asus prime z890-p wifi..jpg', '80,000 pkr', NULL, 10, 'MOBO', 'LGA1851', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(76, 'Asus ROG Crosshair VIII Dark Hero', '1760110524_Asus ROG Crosshair VIII Dark Hero.jpeg', '110,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(80, 'Asus ROG CROSSHAIR X870E HERO', '1760110544_Asus ROG CROSSHAIR X870E HERO.jpeg', '140,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(83, 'Asus ROG STRIX B450-F GAMING', '1760110564_Asus ROG STRIX B450-F GAMING.png', '35,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(84, 'Asus ROG STRIX B550-F GAMING', '1760110584_Asus ROG STRIX B550-F GAMING.webp', '48,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(95, 'Asus ROG STRIX X670E-A GAMING WIFI', '1760110636_Asus ROG STRIX X670E-A GAMING WIFI.jpg', '100,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(96, 'Asus ROG STRIX X670E-E GAMING WIFI', '1760110654_Asus ROG STRIX X670E-E GAMING WIFI.jpg', '125,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(106, 'Asus TUF GAMING B560M-PLUS WIFI', '1760110679_Asus TUF GAMING B560M-PLUS WIFI.webp', '78,000 pkr', NULL, 10, 'MOBO', 'LGA1200', 'Gold / Black', NULL, 'In Stock', NULL, 'PC Component'),
(109, 'Asus TUF GAMING B650-PLUS WIFI', '1760110692_Asus TUF GAMING B650-PLUS WIFI.webp', '64,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(111, 'Asus TUF GAMING B650M-E WIFI', '1760110719_Asus TUF GAMING B650M-E WIFI.jpg', '80,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(113, 'Asus TUF GAMING B650M-PLUS WIFI', '1760110737_Asus TUF GAMING B650M-PLUS WIFI.jpg', '65,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(114, 'Asus TUF GAMING B760-PLUS WIFI', '1760110752_Asus TUF GAMING B760-PLUS WIFI.jpg', '58,000 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(118, 'Asus TUF GAMING B850M-PLUS WIFI', '1760110766_Asus TUF GAMING B850M-PLUS WIFI.webp', '67,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(119, 'Asus TUF GAMING B860-PLUS WIFI', '1760110779_Asus TUF GAMING B860-PLUS WIFI.jpg', '70,000 pkr', NULL, 10, 'MOBO', 'LGA1851', 'Black / Gray', NULL, 'In Stock', NULL, 'PC Component'),
(121, 'Asus TUF GAMING X870-PLUS WIFI', '1760110869_Asus TUF GAMING X870-PLUS WIFI.jpg', '92,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(124, 'Asus TUF GAMING Z890-PLUS WIFI', '1760111047_Asus TUF GAMING Z890-PLUS WIFI.jpg', '85,000 pkr', NULL, 10, 'MOBO', 'LGA1851', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(129, 'Gigabyte A520M DS3H V2', '1760111066_Gigabyte A520M DS3H V2.jpeg', '24,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Gray / Brown', NULL, 'In Stock', NULL, 'PC Component'),
(130, 'Gigabyte A520M K V2', '1760111082_Gigabyte A520M K V2.png', '21,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Brown / Black', NULL, 'In Stock', NULL, 'PC Component'),
(134, 'Gigabyte B450M DS3H', '1760111103_Gigabyte B450M DS3H.jpg', '26,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(136, 'Gigabyte B550M DS3H', '1760111120_Gigabyte B550M DS3H.jpeg', '36,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black / Gold', NULL, 'In Stock', NULL, 'PC Component'),
(137, 'Gigabyte B550M K', '1760111139_Gigabyte B550M K.png', '33,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Brown / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(157, 'Gigabyte B650M DS3H', '1760111157_Gigabyte B650M DS3H.jpg', '54,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Brown / Black', NULL, 'In Stock', NULL, 'PC Component'),
(158, 'Gigabyte B650M GAMING PLUS WIFI', '1760111176_Gigabyte B650M GAMING PLUS WIFI.jpeg', '59,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(185, 'Gigabyte H610M H V2', '1760111194_Gigabyte H610M H V2.jpeg', '65,000 PKR', NULL, 10, 'MOBO', 'LGA1700', 'Brown / Black', NULL, 'In Stock', NULL, 'PC Component'),
(205, 'MSI A320M-A PRO', '1760111209_MSI A320M-A PRO.jpeg', '75,000 PKR', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(206, 'MSI A520M-A PRO', '1760111227_MSI A520M-A PRO.jpeg', '23,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(207, 'MSI B450 TOMAHAWK MAX', '1760111250_MSI B450 TOMAHAWK MAX.png', '95,000 pkr', NULL, 10, 'MOBO', 'AM4', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(217, 'MSI B860 Gaming Plus Wifi Motherboard, ATX - Supports Intel Core Ultra Processors (Series 2), LGA 18', '1759882579_MSI B860 Gaming Plus Wifi Motherboard.PNG', 'pkr 69,499 ', NULL, 10, 'MOBO', 'LGA1851', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(220, 'MSI MAG B650 TOMAHAWK WIFI', '1760111265_MSI MAG B650 TOMAHAWK WIFI.jpeg', '63,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(222, 'MSI MAG B760 TOMAHAWK WIFI', '1760111280_MSI MAG B760 TOMAHAWK WIFI.jpg', '60,000 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(229, 'MSI MAG X870E TOMAHAWK WIFI', '1760112838_MSI MAG X870E TOMAHAWK WIFI.jpeg', '100,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Green', NULL, 'In Stock', NULL, 'PC Component'),
(240, 'MSI MPG X870E CARBON WIFI ATX AM5 DDR5 Gaming Motherboard', '1759879417_MSI PRO X870E-P WIFI.PNG', 'pkr 179,999', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(241, 'MSI MPG X870E EDGE TI WIFI', '1760007877_MSI MPG X870E EDGE TI WIFI.png', '141,999 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / White', NULL, 'In Stock', NULL, 'PC Component'),
(242, 'MSI Z890 Gaming Plus WiFi DDR5 Supports Intel Core Ultra Series 2 Processors LGA 1851 ATX Gaming Mot', '1761351889_MSI Z890 Gaming Plus WiFi DDR5 Supports Intel Core Ultra Series 2 Processors LGA 1851 ATX', '98,999 pkr', NULL, 10, 'MOBO', 'LGA1851', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(243, 'MSI Pro A620M-B DDR5 AM5 AMD Ryzen 9000 MicroATX Motherboard', '1760006588_MSI Pro A620M-B DDR5 AM5 AMD Ryzen 9000 MicroATX Motherboard.PNG', '28,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(245, 'MSI PRO B650-A WiFi DDR5 AM5 AMD ATX Gaming Motherboard', '1760005400_MSI PRO B650-A WiFi DDR5 AM5 AMD ATX Gaming Motherboard.PNG', 'pkr 82,499', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(247, 'MSI Pro B650-S Wifi DDR5 AMD AM5 ATX Motherboard', '1760004908_MSI Pro B650-S Wifi DDR5 AMD AM5 ATX Motherboard.PNG', '48,999', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(249, 'MSI Pro B650M-B DDR5 AM5 AMD microATX Motherboard', '1759883864_MSI Pro B650M-B DDR5 AM5 AMD microATX Motherboard.PNG', '30,999 pkr', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(250, 'MSI Pro B650M-P DDR5 AM5 AMD microATX Motherboard', '1759883488_MSI Pro B650M-P DDR5 AM5 AMD microATX Motherboard.PNG', 'pkr 38,999 ', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(251, 'MSI PRO B660M-A WIFI DDR4', '1759883334_MSI PRO B660M-A WIFI DDR4.png', 'PKR 42,500', NULL, 10, 'MOBO', 'LGA1700', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(252, 'MSI Pro B760M-A Wifi DDR4 Intel 12/13/14th Gen microATX Motherboard', '1759883009_MSI Pro B760M-A Wifi DDR4.PNG', 'pkr 53,999 ', NULL, 10, 'MOBO', 'LGA1700', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(253, 'MSI PRO B760M-P DDR5 LGA 1700 mATX Motherboard', '1759882710_MSI PRO B760M-P DDR5 LGA 1700 mATX Motherboard.PNG', 'pkr 36,499', NULL, 10, 'MOBO', 'LGA1700', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(254, 'MSI PRO B850-P WIFI', '1759881080_msi pro b850-p wifi.PNG', '69,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(255, 'MSI PRO B850M-P WIFI', '1759882284_msi pro b850m-p wifi.PNG', '44,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(256, 'MSI PRO H610M-G WIFI DDR4 LGA 1700 Mini-ATX Motherboard', '1759879663_MSI PRO H610M-G WIFI DDR4 LGA 1700 Mini-ATX Motherboard.PNG', '32,990 pkr', NULL, 10, 'MOBO', 'LGA1700', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(257, 'MSI PRO X870-P WIFI', '1759878805_MSI PRO X870-P WIFI.PNG', '89,999 pkr', NULL, 10, 'MOBO', 'AM5', 'Black / Silver', NULL, 'In Stock', NULL, 'PC Component'),
(258, 'MSI X670E GAMING PLUS WIFI', '1759856609_MSI X670E GAMING PLUS WIFI.png', '80,000 pkr', NULL, 10, 'MOBO', 'AM5', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(259, 'MSI X870 GAMING PLUS WIFI', '1759856045_msi x870 gaming plus wifi.PNG', 'pkr 97,999', NULL, 10, 'MOBO', 'AM5', 'Black / White', NULL, 'In Stock', NULL, 'PC Component'),
(260, 'MSI X870E GAMING PLUS WIFI', '1759851342_msi x870e gaming plus wifi.PNG', 'pkr 97,000', NULL, 10, 'MOBO', 'AM5', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(261, 'MSI Z790 GAMING PLUS WIFI', '1759851083_MSI Z790 GAMING PLUS WIFI.PNG', 'pkr 75,000', NULL, 10, 'MOBO', 'LGA1700', 'Black', NULL, 'In Stock', NULL, 'PC Component'),
(262, 'MSI Z790 PROJECT ZERO', '1759850795_msi z790 project zero.png', 'pkr 79,999', NULL, 10, 'MOBO', 'LGA1700', 'Silver / Black', NULL, 'In Stock', NULL, 'PC Component'),
(263, 'MSI Z890 GAMING PLUS WIFI', '1759847653_Gemini_Generated_Image_lne0fulne0fulne0.png', 'pkr 99,000', NULL, 10, 'MOBO', 'LGA1851', 'Black', NULL, 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_address` text NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL DEFAULT 'Pending',
  `tracking_number` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `customer_name`, `customer_email`, `customer_address`, `customer_phone`, `total_amount`, `payment_method`, `payment_status`, `tracking_number`, `deleted_at`, `order_date`) VALUES
(1, NULL, 'Ayan', 'instagramu306@gmail.com', 'Scheme 33 near subhan Allah hotel street apartment sumaira residency karachi', '', 3150.00, 'cod', 'Pending', NULL, NULL, '2025-12-17 19:13:05'),
(2, 17, 'umair babar2', 'ayan2005amjad@gmail.com', 'schemee 44 sumaira recidency', '', 1599.00, 'cod', 'Dispatched', '', NULL, '2025-12-18 14:24:06'),
(3, 16, 'raza', 'galaxyhub421@gmail.com', 'Rashid Minhas Rd, Block 2 Block 5 Gulshan-e-Iqbal,\r\n\r\nKarachi', '+92 300 9451756', 7830.00, 'cod', 'Completed', '', NULL, '2025-12-18 17:50:51'),
(6, 17, 'hashim shahid karar', 'hashim.dev07@gmail.com', 'xyz', '', 5000.00, 'cod', 'Completed', '', NULL, '2025-12-24 02:14:10'),
(7, 21, 'hashim shahid karar', 'hashim.dev07@gmail.com', 'xyz', '', 163999.00, 'cod', 'Completed', '', NULL, '2025-12-26 10:33:54'),
(8, 21, 'umair babar', 'hashim.dev07@gmail.com', 'xyz', '', 9999.00, 'cod', 'Completed', '', NULL, '2025-12-28 08:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_table` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_table`, `quantity`, `price`) VALUES
(1, 1, 1, 'airpods', 1, 3150.00),
(2, 2, 1, 'airbuds', 1, 1599.00),
(3, 3, 2, 'cases', 14, 220.00),
(4, 3, 1, 'cases', 25, 190.00),
(7, 6, 2, 'adapters', 1, 5000.00),
(8, 7, 29, 'cooler', 1, 28999.00),
(9, 7, 38, 'cpu', 1, 135000.00),
(10, 8, 1, 'adapters', 1, 4999.00),
(11, 8, 2, 'adapters', 1, 5000.00);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires`) VALUES
(4, 'admin@gmail.com', '0d664f8f03789b3c5b4915df64dadacdc9a4de41a2e840ac073b102140dc3d956f254a2395ed0338cf3e47059a04f9e52a88', 1756308505);

-- --------------------------------------------------------

--
-- Table structure for table `power_banks`
--

CREATE TABLE `power_banks` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Power Banks',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID` int(11) NOT NULL,
  `cat_prod_id` int(11) DEFAULT NULL,
  `Name` varchar(100) NOT NULL,
  `Image` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ID`, `cat_prod_id`, `Name`, `Image`, `Price`, `Category`, `description`, `stock_status`) VALUES
(12, NULL, 'AMD Ryzen 5 1600X Chip New in 10 Months warranty', 'ryzen 5 1600x.jpg', '20', 'Processor', 'A 6-core, 12-thread CPU from AMD\'s first-gen Ryzen lineup, offering excellent multi-core performance for budget-friendly builds on the AM4 platform.', 'In Stock'),
(13, NULL, 'AMD Ryzen 5 2600X Chip New in 10 Months warranty', 'ryzen 5 2600x.png', '18', 'Processor', 'A slightly faster version of its predecessor, this 6-core, 12-thread AM4 CPU is a great choice for entry-level gaming and productivity.', 'In Stock'),
(15, NULL, 'AMD Ryzen 9 9950X3D Boxed New in 10 Months Warranty', '1756570428_ryzen 9 9950x3d.PNG', '226', 'Processor', 'The future flagship CPU, combining an extremely high core count with AMD\'s 3D V-Cache™ for the ultimate performance in both gaming and content creation.', 'In Stock'),
(16, NULL, 'AMD Ryzen 5 2600 Chip only New in 10 months warranty', '1756570161_ryzen 5 2600.PNG', '12', 'Processor', 'A classic 6-core, 12-thread CPU for the AM4 socket, providing a fantastic entry point into PC gaming with reliable performance.', 'In Stock'),
(17, NULL, 'AMD Ryzen 5 3600 Chip New in 10 Months warranty', 'ryzen 5 3600.jpg', '18', 'Processor', 'A legendary budget king, this 6-core, 12-thread AM4 CPU is still a capable performer for 1080p gaming and everyday tasks.', 'In Stock'),
(18, NULL, 'AMD Ryzen 5 1600X Chip New in 10 Months warranty', 'ryzen 5 5600.jpg', '27', 'Processor', 'A highly popular 6-core, 12-thread CPU for the AM4 platform, widely regarded as one of the best value processors for gaming.', 'In Stock'),
(19, NULL, 'AMD Ryzen 5 5500 Chip New in 10 Months warranty', 'ryzen 5 5500.jpg', '19', 'Processor', 'A 6-core, 12-thread AM4 processor that offers incredible value, delivering solid performance for 1080p gaming and general use.', 'In Stock'),
(21, NULL, 'AMD Ryzen 5 5600 Chip New in 10 Months warranty', 'ryzen 5 5600.jpg', '27', 'Processor', 'The best-selling Ryzen 5 5600 offers an unbeatable combination of price and performance with its 6 cores and 12 threads on the AM4 socket.', 'In Stock'),
(23, NULL, 'AMD Ryzen 7 5700X3D', '', '30', 'Processor', 'This 8-core CPU brings the power of AMD\'s 3D V-Cache™ to the AM4 platform, providing a massive performance boost in games for a last-gen upgrade.', 'In Stock'),
(24, 1, 'corsair vengeance lpx 16 gb new with 10 months warranty', '1756986508_corsair-lpx-16gb-3200mhz-ram.jpg', '13', 'Ram', 'A 16GB kit (2x8GB) of reliable Corsair Vengeance LPX DDR4 memory, running at 3200MHz. Perfect for most gaming and productivity builds.', 'In Stock'),
(25, 2, 'corsair vengeance lpx 16 gb new with 10 months warranty', '1756986671_corsair-lpx-16gb-3200mhz-ram.jpg', '13', 'Ram', 'This 16GB kit of Corsair Vengeance LPX DDR4 RAM running at 3200MHz is a fantastic choice for building a stable and high-performing PC.', 'In Stock');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `table_name` varchar(50) NOT NULL,
  `color_name` varchar(100) NOT NULL,
  `variant_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `table_name`, `color_name`, `variant_image`) VALUES
(1, 2, 'adapters', '20W - Type-C Port', '1767617401_var_polo_cover.PNG');

-- --------------------------------------------------------

--
-- Table structure for table `psu`
--

CREATE TABLE `psu` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `psu`
--

INSERT INTO `psu` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'XPG Pylon 650W 80 PLUS Bronze PSU (Power Supply Unit)', '1758809085_xpg pylon 650.PNG', '15,499 pkr', NULL, 10, 'psu', NULL, 'A 650W power supply with an 80 PLUS Bronze rating, offering reliable and efficient power for mid-range gaming systems.', 'In Stock', NULL, 'PC Component'),
(2, 'EASE 550W Pro (EB550W) 80 Plus Bronze Certified Fully Modular Power Supply', '1759073569_EASE 550W Pro (EB550W) 80 Plus Bronze Certified Fully Modular Power Supply.PNG', '10,499 pkr', NULL, 10, 'psu', NULL, 'A 550W fully modular power supply with an 80 Plus Bronze certification, allowing for easier cable management and a cleaner build.', 'In Stock', NULL, 'PC Component'),
(3, 'Thermalright TB-S Series 750W 80 Plus Bronze Power Supply', '1759073921_Thermalright TB-S Series 80 Plus Bronze Power Supply.PNG', '14,799 pkr', NULL, 10, 'psu', NULL, 'A 750W power supply with an 80 Plus Bronze rating, providing stable and efficient power for more demanding gaming rigs.', 'In Stock', NULL, 'PC Component'),
(4, 'SilverStone ST65F-ES230 650W 80+ White Power Supply', '1759074010_SilverStone ST65F-ES230 650W 80+ White Power Supply.PNG', '13,499 pkr', NULL, 10, 'Psu', NULL, 'A 650W power supply with an 80+ White certification, offering a reliable and affordable power solution for entry-level systems.', 'In Stock', NULL, 'PC Component'),
(5, 'SilverStone VIVA 550 80 PLUS Bronze 550W Power Supply', '1759074087_SilverStone VIVA 550 80 PLUS Bronze 550W Power Supply.PNG', '13,499 pkr', NULL, 10, 'Psu', NULL, 'A 550W power supply with an 80 PLUS Bronze certification, ensuring good efficiency and stable power for budget to mid-range PCs.', 'In Stock', NULL, 'PC Component'),
(6, 'Super Flower Zillion DB 650W 80 Plus Bronze Power Supply', '1759074293_Super Flower Zillion DB 650W 80 Plus Bronze Power Supply.PNG', '14,799 pkr', NULL, 10, 'Psu', NULL, 'A 650W 80 Plus Bronze certified power supply from Super Flower, known for its quality and reliability.', 'In Stock', NULL, 'PC Component'),
(7, 'DeepCool PF700X 700W 80 Plus Bronze Power Supply ', '1759074371_DeepCool PF700X 700W 80 Plus Bronze Power Supply.PNG', '14,799 pkr', NULL, 10, 'Psu', NULL, 'A 700W 80 Plus Bronze power supply from DeepCool, providing ample power for most gaming builds with reliable performance.', 'In Stock', NULL, 'PC Component'),
(8, 'Corsair CX550 550W 80 Plus Bronze Power Supply', '1759074731_Corsair CX550 550W 80 Plus Bronze Power Supply.png', '15,999 pkr', NULL, 10, 'Psu', NULL, 'A 550W power supply from Corsair\'s reliable CX series, featuring an 80 Plus Bronze rating for efficiency.', 'In Stock', NULL, 'PC Component'),
(9, 'SilverStone Attis 650R 80 PLUS Bronze 650W ATX 3.1 Power Supply', '1759152460_SilverStone Attis 650R 80 PLUS Bronze 650W ATX 3.1 Power Supply.PNG', '16,500 pkr', NULL, 10, 'psu', NULL, 'A 650W 80 PLUS Bronze power supply compliant with the latest ATX 3.1 standard, ensuring compatibility with modern components.', 'In Stock', NULL, 'PC Component'),
(10, 'DeepCool PL650D 650W 80 PLUS Bronze Power Supply', '1759153400_DeepCool PL650D 650W 80 PLUS Bronze Power Supply.PNG', '16,999 pkr', NULL, 10, 'Psu', NULL, 'A 650W power supply from DeepCool with an 80 PLUS Bronze rating, designed for stable and efficient performance.', 'In Stock', NULL, 'PC Component'),
(11, 'Super Flower Zillion DB 750W 80 Plus Bronze Power Supply', '1759153556_Super Flower Zillion DB 750W 80 Plus Bronze Power Supply.PNG', '16,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(12, 'XPG Pylon 750W 80 PLUS Bronze PSU (Power Supply Unit)', '1759153683_xpg pylon 650.PNG', '17,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(13, 'Antec CSK750H 750W 80 PLUS BRONZE Semi-Modular Certified Power Supply', '1759153784_Antec CSK750H 750W 80 PLUS BRONZE Semi-Modular Certified Power Supply.PNG', '18,500 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(14, 'Corsair CX650 650W 80 Plus Bronze Power Supply', '1759155160_corsair cx650.png', '18,500 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(15, 'DeepCool PL750D 80 PLUS Bronze 750W ATX 3.1 Power Supply', '1759155265_DeepCool PL750D 80 PLUS Bronze 750W ATX 3.1 Power Supply.PNG', '18,500 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(16, 'XPG Kyber 650W 80 Plus Gold Power Supply', '1759155444_XPG Kyber 650W 80 Plus Gold Power Supply.PNG', '19,499 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(17, 'MSI MAG A750BN PCIE5 750W 80 PLUS Bronze Power Supply', '1759155582_MSI MAG A750BN PCIE5 750W 80 PLUS Bronze Power Supply.PNG', '19,499 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(18, 'SilverStone Attis 850R 80 PLUS Bronze 850W ATX 3.1 Power Supply', '1759155700_SilverStone Attis 850R 80 PLUS Bronze 650W ATX 3.1 Power Supply.PNG', '20,499 pkr', NULL, 10, 'psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(19, 'Corsair CX Series CX750M – 750 Watt 80 PLUS Bronze Certified Semi-Modular ATX PSU', '1759155770_Corsair CX Series CX750M – 750 Watt 80 PLUS Bronze Certified Semi-Modular ATX PSU.PNG', '20,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(20, 'XPG Kyber 750w 80 PLUS Gold Power Supply ATX 3.0 NON-Modular', '1759155907_XPG Kyber 650W 80 Plus Gold Power Supply.PNG', '23,499 pkr', NULL, 10, 'psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(21, 'XPG Kyber 850w 80 PLUS Gold Power Supply ATX 3.0 NON-Modular', '1759155964_XPG Kyber 650W 80 Plus Gold Power Supply.PNG', '26,499 pkr', NULL, 10, 'psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(22, 'Thermalright SG-850 850W 80 Plus Gold Fully Modular Power Supply –White', '1759156249_Thermalright SG-850 850W 80 Plus Gold Fully Modular Power Supply –White.PNG', '26,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(23, 'DeepCool PM850D 80+ Gold (UK) Power', '1759156411_DeepCool PM850D 80+ Gold (UK) Power Supply.PNG', '29,499 pkr', NULL, 10, 'psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(24, 'Corsair RM650e 650W 80 Plus Gold Fully Modular Power Supply', '1759156499_Corsair RM650e 650W 80 Plus Gold Fully Modular Power Supply.PNG', '28,499 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(25, 'MSI MAG A750GL PCIE5 750W 80 PLUS Gold Power Supply Fully Modular', '1759156648_MSI MAG A750GL PCIE5 750W 80 PLUS Gold Power Supply Fully Modular.PNG', '28,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(26, 'XPG Core Reactor II VE 750W 80 Plus Gold Fully Modular Power Supply', '1759156867_XPG Core Reactor II VE 80 Plus Gold Fully Modular Power Supply.png', '29,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(27, 'Super Flower LEADEX III Gold 850W 80 Plus Gold Fully Modular Power Supply', '1759156984_Super Flower LEADEX III Gold 850W 80 Plus Gold Fully Modular Power Supply.PNG', '30,999 PKR', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(28, 'DeepCool PN850M 850W 80 PLUS Gold Fully Modular ATX 3.1 Power Supply', '1759157068_DeepCool PN850M 850W 80 PLUS Gold Fully Modular ATX 3.1 Power Supply.PNG', '31,999 PKR', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(29, 'SilverStone DA850R Gold 850W 80 PLUS Gold Power Supply', '1759157195_SilverStone DA850R Gold 850W 80 PLUS Gold Power Supply.PNG', '34,199 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(30, 'Antec NeoEco NE850G 850W WHITE 80 PLUS GOLD Certified Fully-Modular Power Supply', '1759157301_Antec NeoEco NE850G 850W WHITE 80 PLUS GOLD Certified Fully-Modular Power Supply.PNG', '34,499 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(31, 'XPG Core Reactor II 850w 80 PLUS Gold Power Supply ATX 3.0 Fully Modular – White', '1759157535_XPG Core Reactor II 850w 80 PLUS Gold Power Supply ATX 3.0 Fully Modular – White.PNG', '35,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(32, 'XPG Fusion 1600 Titanium 1600W 80 Plus Titanium Fully Modular Power Supply', '1759157995_XPG Fusion 1600 Titanium 1600W 80 Plus Titanium Fully Modular Power Supply.PNG', '164,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(33, 'Corsair AX1600i 1600W 80 Plus Titanium Fully Modular Digital Power Supply', '1759158142_Corsair AX1600i 1600W 80 Plus Titanium Fully Modular Digital Power Supply.PNG', '164,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(34, 'SilverStone Zeus 1650R 1650W 80 Plus Titanium Fully Modular Power Supply', '1759158230_SilverStone Zues 1650R 1650W 80 Plus Titanium Fully Modular Power Supply.PNG', '136,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(35, 'Super Flower LEADEX Titanium 1600W 80 Plus Titanium Fully Modular Power Supply', '1759158332_Super Flower LEADEX Titanium 1600W 80 Plus Titanium Fully Modular Power Supply.PNG', '134,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(36, 'Corsair HX1200i 1200W 80 Plus Platinum Fully Modular Power Supply', '1759591286_Corsair HX1200i 1200W 80 Plus Platinum Fully Modular Power Supply.PNG', '84,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(37, 'Corsair HX1000i 1000W 80 Plus Platinum Fully Modular Power Supply', '1759591546_Corsair HX1000i 1000W 80 Plus Platinum Fully Modular Power Supply.PNG', '70,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(38, 'SilverStone HELA 1200R 1200W 80+ Platinum ATX 3.1 Fully Modular Power Supply', '1759591787_SilverStone HELA 1200R 1200W 80+ Platinum ATX 3.1 Fully Modular Power Supply.PNG', '67,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(39, 'MSI MAG A1250GL PCIE5 1250W 80 PLUS Gold Power Supply Fully Modular', '1759592024_MSI MAG A1250GL PCIE5 1250W 80 PLUS Gold Power Supply Fully Modular.PNG', '57,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(40, 'Corsair RM1000x 1000W 80 Plus Gold Fully Modular Power Supply', '1759592200_Corsair RM1000x 1000W 80 Plus Gold Fully Modular Power Supply.PNG', '55,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(41, 'DeepCool PN1200M 1200W 80 Plus Gold Fully Modular Power Supply', '1759592414_DeepCool PN1200M 1200W 80 Plus Gold Fully Modular Power Supply.PNG', '52,499 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(42, 'MSI MAG A850GL PCIE5 850W ATX 3.1 80 PLUS Gold Fully Modular Power Supply – White', '1759592627_MSI MAG A850GL PCIE5 850W ATX 3.1 80 PLUS Gold Fully Modular Power Supply – White.PNG', '35,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(43, 'CORSAIR RMx Series RM850x 850 Watt 80 PLUS Gold Certified Fully Modular PSU', '1759592694_CORSAIR RMx Series RM850x 850 Watt 80 PLUS Gold Certified Fully Modular PSU.PNG', '41,300 PKR', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(44, 'ASRock Steel Legend SL-1200GW 1200W 80 Plus Gold Fully Modular Power Supply – White', '1759592930_ASRock Steel Legend SL-1200GW 1200W 80 Plus Gold Fully Modular Power Supply – White.PNG', '49,999 pkr', NULL, 10, 'Psu', NULL, NULL, 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `ram`
--

CREATE TABLE `ram` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `IMAGE` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ram`
--

INSERT INTO `ram` (`ID`, `Name`, `Price`, `old_price`, `quantity`, `IMAGE`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'Corsair Vengeance Lpx DDR4 16GB 3200mhz CL16', '13,999 pkr', NULL, 10, '1756986977_corsair-lpx-16gb-3200mhz-ram.jpg', 'Ram', NULL, 'A 16GB kit of high-performance DDR4 RAM running at 3200MHz. Its low-profile design ensures compatibility with most CPU coolers.', 'In Stock', NULL, 'PC Component'),
(2, 'Apacer Panther DDR5 16GB 5200MHz Desktop Memory', '14,500 pkr', NULL, 10, '1757861105_apacer panther ddr5 16gb.PNG', 'Ram', NULL, 'A 16GB stick of DDR5 RAM running at 5200MHz, offering a significant speed boost for the latest generation of PCs.', 'In Stock', NULL, 'PC Component'),
(3, 'Kingston 16GB DDR5 5600MHz Desktop Memory', '14,700 pkr', NULL, 10, '1758380521_kingston 16gb ddr5.PNG', 'Ram', NULL, 'A 16GB DDR5 memory module from Kingston, clocked at 5600MHz for high-speed performance in gaming and applications.', 'In Stock', NULL, 'PC Component'),
(4, 'G.Skill trident Z5 Royal Neo RGB 32gb DDR5 6000mhz CL28 Silver Desktop Memory', '44,500 pkr', NULL, 10, '1758637595_Gemini_Generated_Image_lgk6izlgk6izlgk6.png', 'Ram', NULL, 'A premium 32GB kit of DDR5 RAM at 6000MHz, featuring a stunning crystalline light bar and polished silver heatspreaders for a royal look.', 'In Stock', NULL, 'PC Component'),
(5, 'Transcend 8GB DDR4 3200MHz Desktop Ram', '5,999 pkr', NULL, 10, '1758380748_transcend 8gb ddr4.PNG', 'Ram', NULL, 'An 8GB stick of DDR4 RAM at 3200MHz, perfect for budget builds or as a simple upgrade to improve system responsiveness.', 'In Stock', NULL, 'PC Component'),
(6, 'Corsair Vengeance DDR5 16GB 5200MHz CL40 Ram', '15,300 pkr', NULL, 10, '1758464475_Corsair Vengence 16gb ddr5 cl40 ram.PNG', 'ram', NULL, 'A 16GB DDR5 memory module from Corsair\'s renowned Vengeance series, clocked at 5200MHz for excellent next-gen performance.', 'In Stock', NULL, 'PC Component'),
(7, 'XPG Spectrix D35G RGB 16GB 3600MHz DDR4 CL18', '16,500 pkr', NULL, 10, '1758555744_XPG Spectrix D35G RGB 16GB.PNG', 'Ram', NULL, 'A 16GB kit of DDR4 RAM at 3600MHz, featuring customizable RGB lighting to add a vibrant look to your gaming rig.', 'In Stock', NULL, 'PC Component'),
(8, 'XPG Lancer Blade RGB 32GB 6000MHz DDR5 CL30', '37,500 pkr', NULL, 10, '1758555947_XPG Lancer Blade RGB 32GB.PNG', 'Ram', NULL, 'A sleek 32GB kit of low-profile DDR5 RAM running at a fast 6000MHz, featuring a stylish RGB lightbar.', 'In Stock', NULL, 'PC Component'),
(9, 'Lexar 16gb DDR4 3200MHz Ram', '11,999 pkr', NULL, 10, '1758556504_lexar 16gb ddr4.PNG', 'ram', NULL, 'A reliable 16GB kit of DDR4 RAM from Lexar, running at 3200MHz to provide a smooth experience in gaming and multitasking.', 'In Stock', NULL, 'PC Component'),
(10, 'Lexar THOR OC 32GB 6000MHz DDR5 Desktop Memory', '27,990 pkr', NULL, 10, '1758556715_Lexar Thor 32GB OC.PNG', 'ram', NULL, 'A 32GB kit of high-speed DDR5 RAM from Lexar, clocked at 6000MHz and featuring a unique design, optimized for overclocking.', 'In Stock', NULL, 'PC Component'),
(11, 'G.Skill Trident Z5 neo RGB DDR5 6000MHz 64GB Desktop Memory', '72,999 pkr', NULL, 10, '1758557126_G.Skill Trident Z5 RGB DDR5-6000 64GB (2x32GB) Intel XMP Desktop Memory.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(12, 'TeamGroup T-Force Delta 32GB DDR5 6000MHz CL38', '37,500 pkr', NULL, 10, '1758636845_TeamGroup T-Force Delta 32GB (Black)16GBx2 DDR5 6000MHz CL30.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(13, 'G.Skill Ripjaws S5 64GB 6000MHz CL30 DDR5 Desktop Memory ', '64,999 PKR', NULL, 10, '1758637112_G.Skill RIPJAW RGB DDR5-6000 64GB (2x32GB) Intel XMP Desktop Memory.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(14, 'Corsair VENGEANCE RGB 32GB DDR5 DRAM 6400MHz CL36 Desktop Memory', '39,500 PKR', NULL, 9, '1758639919_Corsair Vengence 32gb rgb ddr5 cl40 ram.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(15, 'TeamGroup TForce Delta RGB 16GB DDR4 3600MHz CL18', '15,000 pkr', NULL, 10, '1758640106_TeamGroup TForce Delta RGB DDR4 3600MHz CL18 16GB.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(16, 'Corsair Dominator Titanium RGB 96GB 6600MHz CL32 DDR5 Desktop Memory', '119,900 pkr', NULL, 10, '1758640405_Corsair Dominator Titanium RGB 96GB (2x48GB) 6600MHz CL32 DDR5 RAM.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(17, 'Corsair Dominator Platinum RGB 64GB (2x32GB) 6800MHz CL40 DDR5 iCUE Compatible Desktop Memory', '87,999 PKR', NULL, 9, '1758723324_Corsair Dominator Platinum RGB 64GB 6800MHz CL40 DDR5 RAM.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(18, 'XPG Lancer RGB 64GB 6400MHz CL32 DDR5 Desktop Memory', '74,999 pkr', NULL, 10, '1758723506_XPG Lancer RGB 64GB 6400MHz CL32.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(19, 'TeamGroup T-Force Delta RGB 64GB 6000MHz CL38 DDR5 Desktop Memory', '57,999 pkr', NULL, 10, '1758723860_TeamGroup T-Force Delta RGB 64GB 6000MHz CL38 Black DDR5 Desktop Memory.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(20, 'PNY Performance 8GB 3200MHz CL22 DDR4 Desktop Memory', '5,749 pkr', NULL, 9, '1758724107_PNY Performance 8GB 3200MHz C22 DDR4 Desktop Memory.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(21, 'KINGSTON 16GB 8GBx2 DDR4 3200MHz', '8,999 pkr', NULL, 9, '1758724396_KINGSTON 16GB 8GBx2 DDR4 3200MHz.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(22, 'KINGSTON 16GB 8GBx2 DDR4 3200MHz', '8,999 pkr', NULL, 10, '1758725725_KINGSTON 16GB 8GBx2 DDR4 3200MHz.PNG', 'ram', NULL, NULL, 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `smart_watches`
--

CREATE TABLE `smart_watches` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Smart Watches',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

CREATE TABLE `speakers` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Speakers',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ssd`
--

CREATE TABLE `ssd` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'PC Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ssd`
--

INSERT INTO `ssd` (`ID`, `Name`, `IMAGE`, `Price`, `old_price`, `quantity`, `Category`, `color`, `description`, `stock_status`, `deleted_at`, `product_type`) VALUES
(1, 'ADATA Legend 256GB M.2 NVME SSD', '1758806026_adata legend 710 256gb.PNG', '5,999 pkr', NULL, 10, 'Ssd', NULL, 'A 256GB NVMe SSD that provides a significant speed boost over traditional hard drives, perfect for your operating system and favorite applications.', 'In Stock', NULL, 'PC Component'),
(2, 'ADATA Ultimate SU650 2.5″ 256GB SATA III 3D NAND Internal Solid State Drive (SSD)', '1758806193_ADATA Ultimate SU650 2.5″ 256GB SATA III 3D NAND Internal Solid State Drive (SSD).PNG', '6,000 pkr', NULL, 10, 'Ssd', NULL, 'A 256GB SATA III SSD, offering a fast and reliable storage solution that is a great upgrade from a mechanical hard drive.', 'In Stock', NULL, 'PC Component'),
(3, 'Lexar NM610 PRO M.2 2280 PCIe Gen 3×4 512GB NVMe SSD', '1758806424_Lexar NM610 PRO M.2 2280 PCIe Gen 3×4 NVMe SSD.PNG', '11,499 pkr', NULL, 10, 'Ssd', NULL, 'A 512GB NVMe SSD delivering fast read and write speeds, significantly reducing load times in games and applications.', 'In Stock', NULL, 'PC Component'),
(4, 'HikSemi WAVE 256GB SATA 3.0 SSD ', '1758897397_HikSemi WAVE 256GB SATA 3.0 SSD.PNG', '4,850 pkr', NULL, 10, 'Ssd', NULL, 'An affordable 256GB SATA SSD that provides a quick and responsive experience for your everyday computing needs.', 'In Stock', NULL, 'PC Component'),
(5, 'Lexar NS100 256GB SSD 2.5” SATA III Internal Solid State Drive', '1758897610_Lexar NS100 256GB SSD 2.5” SATA III Internal Solid State Drive.PNG', '6,200 PKR', NULL, 10, 'Ssd', NULL, 'A 256GB SATA III SSD that offers a cost-effective way to speed up your PC, with faster boot times and application loading.', 'In Stock', NULL, 'PC Component'),
(6, 'Lexar NM620 M.2 2280 NVMe SSD 256GB PCle Gen 3x4', '1758897847_Lexar NM620 M.2 2280 NVMe SSD 256GB PCle Gen 3x4.PNG', '6,500 pkr', NULL, 10, 'Ssd', NULL, 'A 256GB NVMe SSD offering fast PCIe Gen 3 speeds, making it an excellent choice for a snappy and responsive system.', 'In Stock', NULL, 'PC Component'),
(7, 'WD Green SN3000 500GB NVMe SSD M.2 2280 5000MB/s PCIe Gen4', '1758898037_WD Green SN3000 500GB NVMe SSD M.2 2280 PCIe Gen4.PNG', '9,800 pkr', NULL, 10, 'Ssd', NULL, 'A 500GB PCIe Gen4 NVMe SSD from Western Digital, delivering next-generation speeds for ultra-fast loading and file transfers.', 'In Stock', NULL, 'PC Component'),
(8, 'Lexar NM610PRO M.2 2280 PCIe Gen3x4 NVMe SSD 1TB', '1758898339_Lexar NM610PRO M.2 2280 PCIe Gen3x4 NVMe SSD 1TB.PNG', '15,990 pkr', NULL, 10, 'Ssd', NULL, 'A 1TB NVMe SSD providing a large capacity and high speeds, perfect for storing your operating system, games, and large files.', 'In Stock', NULL, 'PC Component'),
(9, 'XPG GAMMIX S70 BLADE 512GB PCIe Gen4x4 M.2 2280 Solid State Drive SSD ', '1758898491_XPG GAMMIX S70 BLADE 512GB PCIe Gen4x4 M.2 2280 Solid State Drive SSD.PNG', '16,990 pkr', NULL, 10, 'Ssd', NULL, 'A 512GB PCIe Gen4 NVMe SSD designed for extreme performance, with a heatsink to maintain speed during intense workloads.', 'In Stock', NULL, 'PC Component'),
(10, 'Kingston NV3 1TB M.2 2280 PCIe 4.0 NVMe SSD', '1758898692_Kingston NV3 1TB M.2 2280 PCIe 4.0 NVMe SSD.PNG', '17,500 pkr', NULL, 10, 'Ssd', NULL, 'A 1TB PCIe 4.0 NVMe SSD from Kingston, offering a great balance of high speed, capacity, and value for gamers and creators.', 'In Stock', NULL, 'PC Component'),
(11, 'Samsung 870 EVO 500GB SSD SATA 2.5', '1758898803_Samsung 870 EVO 500GB SSD SATA 2.5.PNG', '17,900 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(12, 'Samsung 9100 PRO 2TB SSD NVMe M.2 ', '1758898920_Samsung 9100 PRO 2TB SSD NVMe M.2.PNG', '76,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(13, 'Lexar NM790 4TB M.2 2280 PCIe Gen 4×4 NVMe SSD', '1758899023_Lexar NM790 4TB M.2 2280 PCIe Gen 4×4 NVMe SSD.PNG', '69,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(14, 'WD Blue SN5000 NVMe SSD 4TB, PCIe Gen4 x4, M.2 2280', '1758899129_WD Blue SN5000 NVMe SSD 4TB WDS400T4B0E, PCIe Gen4 x4, M.2 2280.PNG', '67,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(15, 'Kingston NV3 4TB M.2 2280 PCIe 4.0 NVMe SSD', '1758899211_Kingston NV3 4TB M.2 2280 PCIe 4.0 NVMe SSD.PNG', '67,500 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(16, 'Samsung 990 PRO w/ Heatsink PCIe® 4.0 NVMe™ M.2 (2280) SSD 2TB', '1758899327_Samsung 990 PRO Heatsink PCIe 4.0 NVMe 2TB.PNG', '57,000 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(17, 'Samsung 9100 PRO 1TB SSD NVMe M.2, PCIe 5.0 x4', '1758899427_Samsung 9100 PRO MZ-VAP1T0B 1TB SSD NVMe M.2, PCIe 5.0 x4.PNG', '52,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(18, 'Samsung 980 PRO with Heatsink 2TB PCIe 4.0 NVMe SSD M.2 2280', '1758899521_Samsung 980 PRO with Heatsink 2TB PCIe 4.0 NVMe SSD M.2 2280.PNG', '51,500 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(19, 'WD BLACK SN850X 4TB NVMe Internal Gaming Solid State Drive With Heatsink | 7300MB/s | PCIe Gen4 x4 ', '1758900810_WD BLACK SN850X 4TB NVMe Internal Gaming Solid State Drive.PNG', '80,900 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(20, 'XPG GAMMIX S70 BLADE 4TB PCIe Gen4x4 M.2 NVMe 2280 Solid State Drive SSD ', '1758900951_XPG GAMMIX S70 BLADE 512GB PCIe Gen4x4 M.2 2280 Solid State Drive SSD.PNG', '82,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(21, 'Transcend 1TB NVMe Gen4 SSD M.2 2280, Up To 7400MB/s, PCIe 4.0, 3D TLC NAND, With Heatsink', '1758901107_Transcend 1TB NVMe Gen4 SSD M.2 2280.PNG', '24,500 PKR', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(22, 'Samsung 870 EVO 1TB SSD SATA 2.5', '1758901276_Samsung 870 EVO 500GB SSD SATA 2.5.PNG', '30,900 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(23, 'Samsung 990 EVO Plus Gen4 NVMe SSD 1TB', '1758901367_Samsung 990 EVO Plus Gen4 NVMe SSD 1TB.PNG', '28,700 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(24, 'Lexar NM790 1TB M.2 2280 PCIe Gen 4×4 NVMe SSD 7400MB/s', '1758901463_Lexar NM790 4TB M.2 2280 PCIe Gen 4×4 NVMe SSD.PNG', '23,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(25, 'Samsung 9100 PRO 4TB SSD NVMe M.2 | Speed up to 14,800 MB/s | PCIe 5.0 x4', '1758901732_Samsung 9100 PRO 4TB SSD NVMe.PNG', '147,990 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(26, 'Samsung 990 PRO w/ Heatsink PCIe® 4.0 NVMe™ M.2 (2280) SSD 4TB ', '1758901887_Samsung 990 PRO Heatsink PCIe 4.0 NVMe 2TB.PNG', '105,000 PKR', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(27, 'Lexar NS100 128GB SSD 2.5” SATA III, Internal Solid State Drive', '1758902017_Lexar NS100 256GB SSD 2.5” SATA III Internal Solid State Drive.PNG', '4,000 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component'),
(28, 'HIKVISION 128GB E100 SATA SSD IN PAKISTAN', '1758902255_HIKVISION 128GB E100 SATA SSD IN PAKISTAN.PNG', '3,650 pkr', NULL, 10, 'Ssd', NULL, NULL, 'In Stock', NULL, 'PC Component');

-- --------------------------------------------------------

--
-- Table structure for table `support_chats`
--

CREATE TABLE `support_chats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT 0,
  `sender_type` enum('user','admin') NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_chats`
--

INSERT INTO `support_chats` (`id`, `user_id`, `admin_id`, `sender_type`, `message`, `is_read`, `created_at`) VALUES
(1, 17, 0, 'user', 'i was ordering something but it didnt wrk', 1, '2025-12-17 15:49:39'),
(2, 17, 1, 'admin', 'ok tell me', 0, '2025-12-17 15:50:19'),
(3, 17, 0, 'user', '😄', 1, '2025-12-17 15:55:44'),
(4, 17, 0, 'user', 'i want air buds pro 2', 1, '2025-12-17 18:39:03'),
(5, 17, 1, 'admin', 'yes available', 0, '2025-12-17 18:39:15'),
(6, 17, 0, 'user', 'yes', 1, '2025-12-17 19:17:20'),
(7, 17, 0, 'user', 'hey', 1, '2025-12-18 13:59:57'),
(8, 17, 0, 'user', 'hey', 1, '2025-12-19 22:35:36'),
(9, 17, 1, 'admin', '50 to 60', 0, '2025-12-19 22:37:12'),
(10, 17, 0, 'user', 'hey', 1, '2025-12-21 14:52:55'),
(11, 17, 1, 'admin', 'hey', 0, '2025-12-21 16:58:58'),
(12, 17, 0, 'user', 'hey', 1, '2025-12-21 16:59:09'),
(13, 17, 0, 'user', 'hello i have an issue', 1, '2025-12-24 02:13:31'),
(14, 17, 1, 'admin', 'yes you can tell me', 0, '2025-12-24 02:13:44'),
(15, 21, 0, 'user', 'hello', 1, '2025-12-26 10:37:57'),
(16, 21, 0, 'user', 'hi', 1, '2025-12-28 08:19:11'),
(17, 17, 0, 'user', 'HELLO', 1, '2025-12-29 11:58:43'),
(18, 17, 0, 'user', 'hello', 1, '2026-01-30 10:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `tripods`
--

CREATE TABLE `tripods` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Tripods',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_type` enum('shipping','billing') NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `user_role` varchar(20) NOT NULL DEFAULT 'user',
  `profile_pic` varchar(255) DEFAULT 'default_avatar.png',
  `last_logout` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `theme_preference` varchar(10) DEFAULT 'dark',
  `notification_enabled` int(1) DEFAULT 1,
  `admin_card_last4` varchar(4) DEFAULT NULL,
  `admin_card_type` varchar(20) DEFAULT NULL,
  `admin_card_expiry` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`id`, `name`, `email`, `password`, `verification_token`, `is_verified`, `user_role`, `profile_pic`, `last_logout`, `deleted_at`, `theme_preference`, `notification_enabled`, `admin_card_last4`, `admin_card_type`, `admin_card_expiry`) VALUES
(17, 'hashim', 'hashim.dev07@gmail.com', '$2y$10$oL7cwgszAUD4/BYcl9k9huPjIIULVu/Aj27FYstrlxenZM01djq8a', NULL, 1, 'admin', '694028e8a7249.avif', '2026-01-30 15:44:44', NULL, 'dark', 1, NULL, NULL, NULL),
(21, 'umair babar', 'umairbabar2021@gmail.com', '$2y$10$deN1hXC8DRhEg86reNCGheCn/uUop88R2v3IHkl8N/yrPa0ecg1rG', NULL, 1, 'admin', 'default_avatar.png', '2026-01-05 21:48:37', NULL, 'dark', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

CREATE TABLE `user_payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gateway_token` varchar(255) NOT NULL,
  `card_brand` varchar(50) NOT NULL,
  `last_4_digits` varchar(4) NOT NULL,
  `expiry_month` varchar(2) NOT NULL,
  `expiry_year` varchar(4) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `watch_straps`
--

CREATE TABLE `watch_straps` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IMAGE` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `old_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 10,
  `Category` varchar(100) NOT NULL DEFAULT 'Watch Straps',
  `color` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock_status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `product_type` enum('PC Component','Mobile Accessory') NOT NULL DEFAULT 'Mobile Accessory'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_table` varchar(50) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `product_table`, `added_date`) VALUES
(1, 12, '523', 'mobo', '2025-10-07 17:05:41'),
(2, 12, '519', 'mobo', '2025-10-07 17:05:46'),
(3, 12, '501', 'mobo', '2025-10-07 17:05:58'),
(4, 12, '263', 'mobo', '2025-10-10 19:58:18'),
(5, 12, '240', 'mobo', '2025-10-11 06:48:29'),
(6, 12, '261', 'mobo', '2025-11-12 21:19:54'),
(7, 12, '260', 'mobo', '2025-11-12 21:19:58'),
(8, 12, '259', 'mobo', '2025-11-12 21:20:01'),
(9, 12, '258', 'mobo', '2025-11-12 21:20:03'),
(10, 12, '257', 'mobo', '2025-11-12 21:20:06'),
(11, 12, '253', 'mobo', '2025-11-12 21:20:10'),
(12, 17, '263', 'mobo', '2025-12-01 05:40:17'),
(13, 17, '262', 'mobo', '2025-12-01 06:37:54'),
(14, 17, '261', 'mobo', '2025-12-01 06:37:57'),
(15, 17, '260', 'mobo', '2025-12-01 06:38:01'),
(16, 17, '257', 'mobo', '2025-12-01 06:48:34'),
(17, 17, '259', 'mobo', '2025-12-09 13:43:33'),
(18, 16, '263', 'mobo', '2025-12-21 14:58:53'),
(19, 17, '2', 'adapters', '2025-12-24 14:05:51'),
(20, 17, '1', 'adapters', '2025-12-24 14:05:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adapters`
--
ALTER TABLE `adapters`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airbuds`
--
ALTER TABLE `airbuds`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `airpods`
--
ALTER TABLE `airpods`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `ai_usage`
--
ALTER TABLE `ai_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_date_index` (`user_id`,`last_request_date`);

--
-- Indexes for table `cables`
--
ALTER TABLE `cables`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `carousel_slides`
--
ALTER TABLE `carousel_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `casing`
--
ALTER TABLE `casing`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `chat_typing`
--
ALTER TABLE `chat_typing`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cooler`
--
ALTER TABLE `cooler`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cooling_fans`
--
ALTER TABLE `cooling_fans`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `customer_reviews`
--
ALTER TABLE `customer_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_cases`
--
ALTER TABLE `custom_cases`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gaming_sets`
--
ALTER TABLE `gaming_sets`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `handsfree`
--
ALTER TABLE `handsfree`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `hdd`
--
ALTER TABLE `hdd`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `headsets`
--
ALTER TABLE `headsets`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobo`
--
ALTER TABLE `mobo`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `name` (`Name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `power_banks`
--
ALTER TABLE `power_banks`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `psu`
--
ALTER TABLE `psu`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `smart_watches`
--
ALTER TABLE `smart_watches`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `ssd`
--
ALTER TABLE `ssd`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `support_chats`
--
ALTER TABLE `support_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tripods`
--
ALTER TABLE `tripods`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `watch_straps`
--
ALTER TABLE `watch_straps`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adapters`
--
ALTER TABLE `adapters`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `airbuds`
--
ALTER TABLE `airbuds`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `airpods`
--
ALTER TABLE `airpods`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ai_usage`
--
ALTER TABLE `ai_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cables`
--
ALTER TABLE `cables`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carousel_slides`
--
ALTER TABLE `carousel_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `casing`
--
ALTER TABLE `casing`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `cooler`
--
ALTER TABLE `cooler`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `cooling_fans`
--
ALTER TABLE `cooling_fans`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cpu`
--
ALTER TABLE `cpu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `customer_reviews`
--
ALTER TABLE `customer_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `custom_cases`
--
ALTER TABLE `custom_cases`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gaming_sets`
--
ALTER TABLE `gaming_sets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gpu`
--
ALTER TABLE `gpu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `handsfree`
--
ALTER TABLE `handsfree`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hdd`
--
ALTER TABLE `hdd`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `headsets`
--
ALTER TABLE `headsets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `mobo`
--
ALTER TABLE `mobo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `power_banks`
--
ALTER TABLE `power_banks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `psu`
--
ALTER TABLE `psu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `ram`
--
ALTER TABLE `ram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `smart_watches`
--
ALTER TABLE `smart_watches`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speakers`
--
ALTER TABLE `speakers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ssd`
--
ALTER TABLE `ssd`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `support_chats`
--
ALTER TABLE `support_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tripods`
--
ALTER TABLE `tripods`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `watch_straps`
--
ALTER TABLE `watch_straps`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD CONSTRAINT `user_payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
