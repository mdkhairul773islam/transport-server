-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2022 at 05:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_transport`
--

-- --------------------------------------------------------

--
-- Table structure for table `aknowledges`
--

CREATE TABLE `aknowledges` (
  `id` int(11) NOT NULL,
  `aknowledge_type` varchar(100) NOT NULL,
  `sr_no` varchar(255) NOT NULL,
  `chalan_no` varchar(255) NOT NULL COMMENT 'chalan_no means Freight Memo No',
  `lr_id` int(11) NOT NULL,
  `unload_to` varchar(200) NOT NULL,
  `unload_date` date NOT NULL,
  `unload_branches_id` int(11) NOT NULL COMMENT 'unload branch id from branches table id',
  `delivery_date` date NOT NULL,
  `deliver_places_id` int(11) NOT NULL COMMENT 'places table id',
  `receivable_amount` decimal(8,2) NOT NULL,
  `to_paid_amount` decimal(8,2) NOT NULL,
  `paybill` decimal(8,2) NOT NULL,
  `to_billed` decimal(8,2) NOT NULL,
  `collect_at_branches_id` int(11) NOT NULL COMMENT 'branchase table id',
  `is_given_to_driver` tinyint(1) NOT NULL,
  `closed_reason` text NOT NULL COMMENT 'remark',
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `branches_id`, `title`, `description`, `trash`, `created_at`, `updated_at`) VALUES
(1, 2, 'This is a update title ', 'Title 2', 1, '2022-04-15', '2022-04-16'),
(2, 2, 'This is a update title 2', 'Title 2', 1, '2022-04-15', '2022-04-16'),
(3, 2, 'Track 025', 'This is a trak 42', 1, '2022-04-15', '0000-00-00'),
(4, 2, 'Test a', '45', 1, '2022-06-11', '2022-06-11'),
(5, 3, 'This is a dhaka  branch test articale ', 'Description', 0, '2022-07-05', '2022-07-05');

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(11) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `branch_code` varchar(255) NOT NULL,
  `ifsc_code` varchar(255) NOT NULL,
  `micr_code` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `bank_name`, `branch_name`, `branch_code`, `ifsc_code`, `micr_code`, `telephone`, `email`, `address`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Brack Bank', 'Dhaka', '512', '458', '789', '01636882947', 'abc@gmail.com', 'Dhaka Jatara Bari', 0, '2022-04-19', '0000-00-00'),
(2, 'Brack Bank', 'Dhaka', '512', '458', '789', '01636882947', 'abc@gmail.com', 'Dhaka Jatara Bari', 0, '2022-04-19', '0000-00-00'),
(3, 'Brack Bank', 'Dhaka', '512', '458', '789', '01636882947', 'abc@gmail.com', 'Dhaka Jatara Bari', 0, '2022-04-19', '0000-00-00'),
(4, 'AD', '48', '7845', '78', '78', '78', 'we@gmail.com', 'dasd dasd', 0, '2022-07-22', '2022-07-22');

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` int(11) NOT NULL,
  `banks_id` int(11) NOT NULL COMMENT 'bank_id from bank table id',
  `ifsc_code` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `account_holder` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `account_no` varchar(255) NOT NULL,
  `opening_balance` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `banks_id`, `ifsc_code`, `account_type`, `account_holder`, `customer_id`, `account_no`, `opening_balance`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '4584545', 'Bussnies', 'Riahn', '4', '7874', '5478.00', 0, '2022-04-18', '2022-04-19'),
(2, 1, '4584545', 'Bussnies', 'Riahn', '4', '7874', '5478.00', 1, '2022-04-18', '2022-04-19'),
(3, 4, '', 'Recurring Account', '5412', '45212', '875445', '100.00', 0, '2022-07-22', '0000-00-00'),
(4, 2, '', 'Saving Account', '5412', '45212', '875445', '100.00', 1, '2022-07-22', '2022-07-22'),
(5, 2, '452', 'Personal', 'Wodud Mia', '2', '1248', '100.00', 1, '2022-04-18', '0000-00-00'),
(6, 1, '4584545', 'Bussnies', 'Riahn', '4', '7874', '5478.00', 0, '2022-04-18', '2022-04-19'),
(7, 2, '452', 'Recurring Account', 'Marinda', '2', '124', '100.00', 0, '2022-04-18', '2022-07-22'),
(8, 4, '', 'Saving Account', '45', '4545', '87', '4545.00', 1, '2022-07-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `bill_no` varchar(255) NOT NULL,
  `customers_id` int(11) NOT NULL,
  `remark` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bill_details`
--

CREATE TABLE `bill_details` (
  `id` int(11) NOT NULL,
  `bills_id` int(11) NOT NULL,
  `lr` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `article_or_weight` decimal(8,2) NOT NULL,
  `way_bill_no_date` varchar(255) NOT NULL,
  `memo_no` varchar(255) NOT NULL,
  `vehicle_no` varchar(255) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bill_payments`
--

CREATE TABLE `bill_payments` (
  `id` int(11) NOT NULL,
  `bills_id` int(11) NOT NULL,
  `total_amount` decimal(8,2) NOT NULL,
  `service_tax` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `due_date` date NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL COMMENT 'code means branch_code',
  `abbrevation` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'title means branch name',
  `description` longtext NOT NULL,
  `place_id` varchar(255) NOT NULL COMMENT 'place_id from places table id',
  `opening_balance` decimal(8,2) NOT NULL,
  `payment_type` varchar(255) NOT NULL COMMENT 'Here Payment type is Credit or Debit',
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `code`, `abbrevation`, `title`, `description`, `place_id`, `opening_balance`, `payment_type`, `trash`, `created_at`, `updated_at`) VALUES
(1, '10', 'abbrevation 1045', '0', 'description 10', '2', '51.00', 'credit', 1, '2022-04-18', '0000-00-00'),
(2, '10', 'abbrevation 1045', '0', 'description 10', '2', '51.00', 'credit', 1, '2022-04-18', '0000-00-00'),
(3, '101', 'Abbreviation', 'Dhaka', '-', '1', '0.00', 'credit', 0, '2022-07-05', '2022-07-05');

-- --------------------------------------------------------

--
-- Table structure for table `cash_memos`
--

CREATE TABLE `cash_memos` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `memo_no` int(11) NOT NULL COMMENT 'memeo_no means no',
  `customers_id` int(11) NOT NULL COMMENT 'customer table id',
  `vendor_code` varchar(255) NOT NULL,
  `remark` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cash_memo_bills`
--

CREATE TABLE `cash_memo_bills` (
  `id` int(11) NOT NULL,
  `cash_memos_id` int(11) NOT NULL,
  `lr_id` int(11) NOT NULL,
  `lr_date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `article` int(11) NOT NULL,
  `weight` decimal(8,2) NOT NULL,
  `gcn_no` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `hamali` decimal(8,2) NOT NULL,
  `octroi` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cash_memo_bills_charges`
--

CREATE TABLE `cash_memo_bills_charges` (
  `id` int(11) NOT NULL,
  `cash_memos_id` int(11) NOT NULL,
  `freight` decimal(8,2) NOT NULL,
  `total_hamali` decimal(8,2) NOT NULL,
  `osc` decimal(8,2) NOT NULL,
  `delivery_charge` decimal(8,2) NOT NULL,
  `other_charge` decimal(8,2) NOT NULL,
  `statistical` decimal(8,2) NOT NULL,
  `tds` decimal(8,2) NOT NULL,
  `total_amount` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `branchs_id` int(11) NOT NULL COMMENT 'branch_id from Branch table id',
  `customer_name` varchar(255) NOT NULL,
  `correspondence_address` longtext NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `faxno` varchar(255) NOT NULL,
  `cstno` varchar(255) NOT NULL,
  `gstno` varchar(255) NOT NULL,
  `states` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `vendorcode` varchar(255) NOT NULL COMMENT 'vendorcode from cendor table code',
  `vatno` varchar(200) NOT NULL,
  `eccno` varchar(200) NOT NULL,
  `opening_balance` decimal(8,2) NOT NULL,
  `payment_type` varchar(200) NOT NULL COMMENT 'Payment Type means Debit Or Credit',
  `closing_balance` decimal(8,2) NOT NULL,
  `closing_payment_type` varchar(100) NOT NULL COMMENT 'Status value active or deactive',
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `branchs_id`, `customer_name`, `correspondence_address`, `telephone`, `faxno`, `cstno`, `gstno`, `states`, `city`, `customer_email`, `vendorcode`, `vatno`, `eccno`, `opening_balance`, `payment_type`, `closing_balance`, `closing_payment_type`, `trash`, `created_at`, `updated_at`) VALUES
(5, 3, 'Khai Khai', 'Akter', '01707536945', '12', '56', '56', 'AN', 'Pune', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'credit', 1, '2022-07-05', '2022-07-05'),
(6, 3, 'Khairul Islam 2', 'Akter', '01707536945', '4', '56', '56', 'AR', 'Kallam', 'abc@gmail.com', '1278', '5', '12', '78.00', 'debit', '100.00', 'debit', 1, '2022-07-05', '0000-00-00'),
(7, 3, 'Khairul Islam', 'Akter', '01707536945', '12', '56', '56', 'BR', 'Kallam', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'credit', 1, '2022-07-05', '0000-00-00'),
(8, 3, 'Khairul Islam 48754', 'Akter', '01707536945', '12', '56', '56', 'BR', 'Pune', 'abc@gmail.com', '12', '5', '12', '1004.00', 'debit', '10.00', 'credit', 1, '2022-07-05', '0000-00-00'),
(9, 3, 'Khairul Islam', 'Akter', '01707536945', '12', '56', '56', 'AR', 'Pune', 'abc@gmail.com', '1278', '5', '12', '100.00', 'credit', '10.00', 'debit', 1, '2022-07-05', '0000-00-00'),
(10, 3, 'Khairul Islam', 'Akter', '01707536945', '12', '56', '56', 'AN', 'Pune', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '100.00', 'credit', 1, '2022-07-05', '0000-00-00'),
(11, 3, 'Khairul Islam Free', 'Akter', '01707536945', '12', '56', '56', 'AN', 'Pune', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'debit', 0, '2022-07-05', '0000-00-00'),
(12, 3, 'Khairul Islam 2', 'Akter', '01707536945', '12', '56', '56', 'AN', 'Kallam', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'credit', 0, '2022-07-05', '0000-00-00'),
(13, 3, 'Khai Khai', 'Akter', '01707536945', '12', '56', '56', 'BR', 'Kallam', 'abc@gmail.com', '12', '5', '12', '100.00', 'debit', '10.00', 'credit', 0, '2022-07-05', '0000-00-00'),
(14, 3, 'fsdfsd', 'Akter', '01707536945', '12', '56', '56', 'AN', 'Pune', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'debit', 0, '2022-07-06', '0000-00-00'),
(15, 3, 'FRD', 'Akter', '01707536945', '12', '56', '56', 'AS', 'Kallam', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '100.00', 'credit', 0, '2022-07-06', '0000-00-00'),
(16, 3, 'Khai Khai', 'Akter', '01707536945', '12', '56', '56', 'BR', 'Kallam', 'abc@gmail.com', '12', '5', '12', '100.00', 'credit', '10.00', 'credit', 0, '2022-07-06', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `customer_references`
--

CREATE TABLE `customer_references` (
  `id` int(11) NOT NULL,
  `customers_id` int(11) NOT NULL COMMENT 'customer_id form customer table id',
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL COMMENT 'designation_id from designation table id',
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_references`
--

INSERT INTO `customer_references` (`id`, `customers_id`, `name`, `address`, `designation`, `email`, `mobile`, `trash`, `created_at`, `updated_at`) VALUES
(22, 5, 'Wadud', 'Dhaka', '-', '0146987552', '0146987552', 1, '2022-07-03', '0000-00-00'),
(23, 5, 'Coca Cola', '78', '-', '01707536912', '01707536912', 1, '2022-07-03', '0000-00-00'),
(24, 6, 'Coca Cola 5', 'a', '-', 'mdkhairul73@gmail.com', '01707536945', 1, '2022-07-05', '0000-00-00'),
(25, 6, 'ABC', '454', '-', 'a@gmail.com', '01707536912', 1, '2022-07-05', '0000-00-00'),
(26, 7, 'Hire Client', '54', '-', 'mdkhairul773@gmail.com', '0196974851', 1, '2022-07-05', '0000-00-00'),
(27, 8, 'Coca Cola 11', '565', '-', 'mdkhairul773@gmail.com', '01707536912', 1, '2022-07-05', '0000-00-00'),
(28, 8, 'Coca Cola', '4547', '-', 'a@gmail.com', '0196974851', 1, '2022-07-05', '0000-00-00'),
(29, 9, 'Coca Cola', 'asddasd', '-', 'mdkhairul773@gmail.com', '0196974851', 1, '2022-07-05', '0000-00-00'),
(30, 10, 'Coca Cola', '-', '-', 'mdkhairul773@gmail.com', '0196974851', 1, '2022-07-05', '0000-00-00'),
(31, 12, 'ABC', '54', '-', 'a@gmail.com', '0196974851', 0, '2022-07-05', '0000-00-00'),
(32, 13, 'Coca Cola', '454', '-', 'mdkhairul773@gmail.com', '0196974851', 0, '2022-07-05', '0000-00-00'),
(33, 14, 'Coca Cola', 'asdad', '-', 'mdkhairul773@gmail.com', '0196974851', 0, '2022-07-06', '0000-00-00'),
(34, 15, 'Coca Cola', '5454', '-', 'mdkhairul773@gmail.com', '0196974851', 0, '2022-07-06', '0000-00-00'),
(35, 16, 'Coca Cola', NULL, '-', 'java.khairul', '0196974851', 0, '2022-07-06', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `dob` date NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `father_name` varchar(200) NOT NULL,
  `referenced` varchar(200) NOT NULL,
  `eyesight` varchar(255) NOT NULL,
  `licenseno` text NOT NULL,
  `licensetype` varchar(200) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `joiningdate` date NOT NULL,
  `bloodgroup` varchar(100) NOT NULL,
  `renewdate` date NOT NULL,
  `expirydate` date NOT NULL,
  `remark` longtext NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `address`, `permanent_address`, `dob`, `telephone`, `father_name`, `referenced`, `eyesight`, `licenseno`, `licensetype`, `qualification`, `joiningdate`, `bloodgroup`, `renewdate`, `expirydate`, `remark`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Atkey Misha Rahman', 'Polly Bidut', 'Dhaka', '1996-02-01', '01636882947', 'Mizanur Rahman', 'Abid', 'Grayee', '7845487', 'Permanet', 'Good', '2022-05-04', 'B+', '2022-04-05', '2065-04-23', 'rest', 0, '2022-04-12', '2022-04-12'),
(2, 'Khairul Islam', 'Dhaka', 'Gupla Ganjo', '1996-04-26', '01707536945', 'Mizanur Rahman', 'Khairul islam', 'Blue, Black', '4589', '785544', 'Frist', '2022-04-26', 'A+', '2025-04-01', '2029-04-02', 'Testest Data', 0, '2022-04-26', '0000-00-00'),
(4, 'Khairul Islam', 'Dhaka', 'Gupla Ganjo', '1996-04-26', '01707536945', 'Mizanur Rahman', 'Khairul islam', 'Blue, Black', '4589', '785544', 'Frist', '2022-04-26', 'A+', '2025-04-01', '2029-04-02', 'Testest Data', 0, '2022-04-26', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `dob` varchar(200) NOT NULL,
  `mobileno` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `joiningdate` date NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `bloodgroup` varchar(100) NOT NULL,
  `designation` varchar(255) NOT NULL COMMENT 'designation_id from designation table id',
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `address`, `permanent_address`, `dob`, `mobileno`, `email`, `joiningdate`, `qualification`, `bloodgroup`, `designation`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Wodud Akanda', 'Mymensingh', 'Mymensingh Dhaka bangladesh', '1996-10-03', '01707536945', 'khairul@gmail.com', '2016-01-01', 'qualification', 'A+', 'Engineer', 0, '2022-04-18', '0000-00-00'),
(2, 'Wodud Akanda', 'Mymensingh', 'Mymensingh Dhaka bangladesh', '1996-10-03', '01707536945', 'khairul@gmail.com', '2016-01-01', 'qualification', 'A+', 'Engineer', 0, '2022-04-18', '0000-00-00'),
(3, 'Alisa', '45346546', 'asdasda', '2022-07-22T04:05:42.753Z', '01707536945', 'abc@gmail.com', '2022-07-22', '10', 'B-', 'DDC', 0, '2022-07-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `loading_trips`
--

CREATE TABLE `loading_trips` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `memo_no` varchar(255) NOT NULL,
  `vehicles_id` int(11) NOT NULL,
  `vehicle_owner` varchar(200) DEFAULT NULL,
  `owner_address` text DEFAULT NULL,
  `driveres_id` int(11) NOT NULL,
  `license_no` text NOT NULL COMMENT 'drivere license no',
  `mobile_no` varchar(255) NOT NULL COMMENT 'drivere mobile no',
  `places_id_from` int(11) NOT NULL,
  `places_id_to` int(11) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `loading_trips_charges`
--

CREATE TABLE `loading_trips_charges` (
  `id` int(11) NOT NULL,
  `loading_trips_id` int(11) NOT NULL COMMENT 'loading_trips_id from loading_trips id ',
  `total_pay` decimal(10,0) NOT NULL,
  `total_billed` decimal(10,0) NOT NULL,
  `hire_rs` decimal(10,0) NOT NULL,
  `adv_rs` decimal(10,0) NOT NULL,
  `commision` decimal(10,0) NOT NULL,
  `hamali` decimal(10,0) NOT NULL,
  `stacking_rs` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `loading_trip_transactions`
--

CREATE TABLE `loading_trip_transactions` (
  `id` int(11) NOT NULL,
  `loading_trips_id` int(11) NOT NULL,
  `lr` varchar(255) NOT NULL,
  `consign_no` varchar(200) NOT NULL,
  `consignor` varchar(200) NOT NULL,
  `places_id_from` int(11) NOT NULL,
  `consignee` varchar(200) NOT NULL,
  `places_id_to` int(11) NOT NULL,
  `weight` decimal(8,2) NOT NULL,
  `to_pay` varchar(255) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `local_memos`
--

CREATE TABLE `local_memos` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `memo_no` varchar(255) NOT NULL,
  `vehicles_id` int(11) NOT NULL,
  `vehicle_owner` varchar(200) DEFAULT NULL,
  `owner_address` text DEFAULT NULL,
  `driveres_id` int(11) NOT NULL,
  `license_no` text NOT NULL COMMENT 'drivere license no',
  `mobile_no` varchar(255) NOT NULL COMMENT 'drivere mobile no',
  `places_id_from` int(11) NOT NULL,
  `places_id_to` int(11) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `local_memo_charges`
--

CREATE TABLE `local_memo_charges` (
  `id` int(11) NOT NULL,
  `local_memos_id` int(11) NOT NULL COMMENT 'local_memos id ',
  `total_pay` decimal(10,0) NOT NULL,
  `total_billed` decimal(10,0) NOT NULL,
  `hire_rs` decimal(10,0) NOT NULL,
  `adv_rs` decimal(10,0) NOT NULL,
  `commision` decimal(10,0) NOT NULL,
  `hamali` decimal(10,0) NOT NULL,
  `stacking_rs` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `local_memo_transactions`
--

CREATE TABLE `local_memo_transactions` (
  `id` int(11) NOT NULL,
  `local_memos_id` int(11) NOT NULL,
  `lr` varchar(255) NOT NULL,
  `consign_no` varchar(200) NOT NULL,
  `consignor` varchar(200) NOT NULL,
  `places_id_from` int(11) NOT NULL,
  `consignee` varchar(200) NOT NULL,
  `places_id_to` int(11) NOT NULL,
  `weight` decimal(8,2) NOT NULL,
  `to_pay` varchar(255) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lorry_billings`
--

CREATE TABLE `lorry_billings` (
  `id` int(11) NOT NULL,
  `lorry_id` int(11) NOT NULL COMMENT 'lorry_id from lorry_receipts table id',
  `material_cost` decimal(8,2) NOT NULL,
  `delivery_type` varchar(255) NOT NULL,
  `delivery_days` varchar(255) NOT NULL,
  `pay_type` varchar(255) NOT NULL,
  `to_billed` varchar(200) NOT NULL,
  `collect_at_branch` varchar(200) NOT NULL COMMENT 'collect_at_branch id from branch table id',
  `service_tax_by` varchar(255) NOT NULL,
  `remark` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lorry_billings`
--

INSERT INTO `lorry_billings` (`id`, `lorry_id`, `material_cost`, `delivery_type`, `delivery_days`, `pay_type`, `to_billed`, `collect_at_branch`, `service_tax_by`, `remark`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 1, '2022-04-24', '2022-06-17'),
(2, 2, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 1, '2022-04-24', '2022-06-17'),
(3, 3, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(4, 4, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(5, 5, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 1, '2022-04-24', '2022-06-17'),
(6, 6, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(7, 7, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(8, 8, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(9, 9, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(10, 10, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 1, '2022-04-24', '2022-06-17'),
(11, 11, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(12, 12, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 0, '2022-04-24', '2022-06-17'),
(13, 13, '1200.00', 'delivery_type', '10', 'pay_type', 'to_billed', '1', 'service_tax_by', 'remark', 1, '2022-04-24', '2022-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `lorry_freights`
--

CREATE TABLE `lorry_freights` (
  `id` int(11) NOT NULL,
  `lorry_id` int(11) NOT NULL COMMENT 'lorry_id from lorry_receipts table id',
  `total_freight` decimal(8,2) NOT NULL,
  `osc` decimal(8,2) NOT NULL,
  `door` decimal(8,2) NOT NULL,
  `other_charges` decimal(8,2) NOT NULL,
  `hamali` decimal(8,2) NOT NULL,
  `statistical` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lorry_freights`
--

INSERT INTO `lorry_freights` (`id`, `lorry_id`, `total_freight`, `osc`, `door`, `other_charges`, `hamali`, `statistical`, `total`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 1, '2022-04-24', '2022-06-17'),
(2, 2, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 1, '2022-04-24', '2022-06-17'),
(3, 3, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(4, 4, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(5, 5, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 1, '2022-04-24', '2022-06-17'),
(6, 6, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(7, 7, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(8, 8, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(9, 9, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(10, 10, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 1, '2022-04-24', '2022-06-17'),
(11, 11, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(12, 12, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 0, '2022-04-24', '2022-06-17'),
(13, 13, '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', '1.00', 1, '2022-04-24', '2022-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `lorry_receipts`
--

CREATE TABLE `lorry_receipts` (
  `id` int(11) NOT NULL,
  `branche_id` int(11) NOT NULL,
  `lr_id` int(11) NOT NULL COMMENT 'lr_id from Lorry table id',
  `invoice_no` varchar(255) NOT NULL,
  `vehicle_id` int(11) NOT NULL COMMENT 'vehicle_id from vehicles table here using Truck/Tempo No',
  `customer_id_from` int(11) NOT NULL COMMENT 'customer_id from custommers table id here use Consignor',
  `consignorgst_from` varchar(200) NOT NULL,
  `consigner_address_from` text NOT NULL,
  `place_id_from` int(11) NOT NULL COMMENT 'place_id from places table id',
  `customer_id_to` int(11) NOT NULL,
  `consignorgst_to` varchar(200) NOT NULL,
  `consigner_address_to` text NOT NULL,
  `place_id_to` int(11) NOT NULL,
  `delivery_at` date NOT NULL,
  `delivery_address` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `trash` int(11) NOT NULL DEFAULT 0 COMMENT 'O means not delete 1 means this data delete',
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lorry_receipts`
--

INSERT INTO `lorry_receipts` (`id`, `branche_id`, `lr_id`, `invoice_no`, `vehicle_id`, `customer_id_from`, `consignorgst_from`, `consigner_address_from`, `place_id_from`, `customer_id_to`, `consignorgst_to`, `consigner_address_to`, `place_id_to`, `delivery_at`, `delivery_address`, `city`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 1, '2022-04-24', '2022-06-17'),
(2, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 1, '2022-04-24', '2022-06-17'),
(3, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(4, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(5, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 1, '2022-04-24', '2022-06-17'),
(6, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(7, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(8, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(9, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(10, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 1, '2022-04-24', '2022-06-17'),
(11, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(12, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 0, '2022-04-24', '2022-06-17'),
(13, 1, 1, '12452', 1, 1, '1', 'consigner_address_from', 1, 1, '1', 'consigner_address_to', 1, '0000-00-00', 'delivery_address', 'city', 1, '2022-04-24', '2022-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `lorry_transactions`
--

CREATE TABLE `lorry_transactions` (
  `id` int(11) NOT NULL,
  `lorry_id` int(11) NOT NULL COMMENT 'lorry_id from lorry_receipts table id',
  `articale_id` int(11) NOT NULL COMMENT 'articale_id from articales table id',
  `no_of_article` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `weight` decimal(8,2) NOT NULL,
  `rate_per` varchar(200) NOT NULL,
  `rate` decimal(8,2) NOT NULL,
  `freight` decimal(8,2) NOT NULL,
  `total_no_article` decimal(8,2) NOT NULL,
  `total_weight` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lorry_transactions`
--

INSERT INTO `lorry_transactions` (`id`, `lorry_id`, `articale_id`, `no_of_article`, `description`, `weight`, `rate_per`, `rate`, `freight`, `total_no_article`, `total_weight`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 1, '2022-04-13', '0000-00-00'),
(2, 1, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 1, '2022-04-13', '0000-00-00'),
(3, 2, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 1, '2022-04-13', '0000-00-00'),
(4, 2, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 1, '2022-04-13', '0000-00-00'),
(5, 3, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(6, 3, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(7, 4, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(8, 4, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(9, 5, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 1, '2022-04-13', '0000-00-00'),
(10, 5, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 1, '2022-04-13', '0000-00-00'),
(11, 6, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(12, 6, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(13, 7, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(14, 7, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(15, 8, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(16, 8, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(17, 9, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(18, 9, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(19, 10, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 1, '2022-04-13', '0000-00-00'),
(20, 10, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 1, '2022-04-13', '0000-00-00'),
(21, 11, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(22, 11, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(23, 12, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 0, '2022-04-13', '0000-00-00'),
(24, 12, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 0, '2022-04-13', '0000-00-00'),
(25, 13, 1, 'no_of_article', 'description', '10.00', '12', '123.00', '65.00', '20.00', '100.00', 1, '2022-04-13', '0000-00-00'),
(26, 13, 2, 'no_of_article2', 'description2', '102.00', '122', '1232.00', '652.00', '202.00', '1002.00', 1, '2022-04-13', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `menu_permissions`
--

CREATE TABLE `menu_permissions` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `menu_items` varchar(255) NOT NULL,
  `is_view` tinyint(1) NOT NULL,
  `is_edit` tinyint(1) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `money_transfers`
--

CREATE TABLE `money_transfers` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `money_transfer_no` int(11) NOT NULL,
  `transfer_branches_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `remark` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_advices`
--

CREATE TABLE `payment_advices` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `tsc_no` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `total_amount` decimal(8,2) NOT NULL,
  `remain` decimal(8,2) NOT NULL,
  `paid` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_advice_charge`
--

CREATE TABLE `payment_advice_charge` (
  `id` int(11) NOT NULL,
  `payment_advices_id` int(11) NOT NULL,
  `outstanding` decimal(8,2) NOT NULL,
  `total_paid_amount` decimal(8,2) NOT NULL,
  `pay_mode` varchar(200) NOT NULL COMMENT 'pay_mode means transaction type credit or debit',
  `banks_id` int(11) NOT NULL,
  `chq_no` decimal(8,2) NOT NULL,
  `chq_date` date NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_collections`
--

CREATE TABLE `payment_collections` (
  `id` int(11) NOT NULL,
  `customers_id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `bill_no` int(11) NOT NULL COMMENT 'bill_no from bills table bills no',
  `received_amount` decimal(8,2) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_collection_charge`
--

CREATE TABLE `payment_collection_charge` (
  `id` int(11) NOT NULL,
  `payment_collections_id` int(11) NOT NULL,
  `outstanding` decimal(8,2) NOT NULL,
  `total_received_amount` decimal(8,2) NOT NULL,
  `pay_mode` varchar(200) NOT NULL COMMENT 'pay_mode means transaction type credit or debit',
  `banks_id` int(11) NOT NULL,
  `chq_no` decimal(8,2) NOT NULL,
  `chq_date` date NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `petty_cash_transactions`
--

CREATE TABLE `petty_cash_transactions` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `available_balance` decimal(8,2) NOT NULL,
  `pay_mode` varchar(200) NOT NULL,
  `is_advance` tinyint(1) NOT NULL,
  `ls_numbers` varchar(255) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `type` varchar(200) NOT NULL COMMENT 'type means customer, driver etc',
  `type_id` int(11) NOT NULL COMMENT 'type_id means driver, customer etc id',
  `description` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'title means place name ',
  `placeabbre` varchar(200) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `title`, `placeabbre`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Savar', 'Polly Bidut', 0, '2022-04-17', '2022-04-19'),
(2, 'Mymensingh', 'Placeabbre', 0, '2022-04-17', '0000-00-00'),
(3, 'Kolkata', 'India', 0, '2022-07-05', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `supplier_type` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pan_no` varchar(255) NOT NULL,
  `vendor_code` varchar(255) NOT NULL,
  `vat_no` varchar(255) NOT NULL,
  `cst_no` varchar(255) NOT NULL,
  `ecc_no` varchar(255) NOT NULL,
  `opening_balance` decimal(8,2) NOT NULL,
  `payment_type` varchar(200) NOT NULL COMMENT 'payment type means Debit or Credit',
  `opening_balance_date` date NOT NULL,
  `closing_balance` decimal(8,2) NOT NULL COMMENT 'closing balance type means Debit or Credit',
  `closing_balance_type` varchar(100) NOT NULL,
  `closing_balance_date` date NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_name`, `branch_id`, `supplier_type`, `address`, `state`, `city`, `telephone`, `email`, `pan_no`, `vendor_code`, `vat_no`, `cst_no`, `ecc_no`, `opening_balance`, `payment_type`, `opening_balance_date`, `closing_balance`, `closing_balance_type`, `closing_balance_date`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'supplier_name', 3, 'supplier_type', 'address', 'state', 'city', 'telephone', 'gnh@gmail.com', 'pan_no', 'vendor_code', 'vat_no', 'cst_no', '4', '10.00', 'payment_type', '2022-04-23', '0.00', 'closing_balance_type', '2022-04-23', 0, '2022-04-24', '2022-07-22');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers_contact_person_details`
--

CREATE TABLE `suppliers_contact_person_details` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `designation` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers_contact_person_details`
--

INSERT INTO `suppliers_contact_person_details` (`id`, `suppliers_id`, `name`, `address`, `designation`, `email`, `mobile`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 'tax_type Update', 'address', 'designation', 'mobile', 'mobile', 0, '2022-04-12', '2022-07-21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `branches_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT 'user type',
  `employees_id` int(11) NOT NULL COMMENT 'employee_id from employee table id',
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirmpassword` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL COMMENT 'status contain active or deactive',
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `voname` varchar(255) NOT NULL COMMENT 'Vehicle Owner Name',
  `vtype` varchar(100) NOT NULL COMMENT 'Vehicle Type',
  `vehicle_no` varchar(255) NOT NULL,
  `capacity` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `regdate` date NOT NULL,
  `vehicle_expdate` date NOT NULL,
  `engineno` varchar(255) NOT NULL,
  `chasisno` varchar(255) NOT NULL,
  `pucno` varchar(255) NOT NULL,
  `puc_expdate` date NOT NULL,
  `body` varchar(100) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `voname`, `vtype`, `vehicle_no`, `capacity`, `make`, `description`, `regdate`, `vehicle_expdate`, `engineno`, `chasisno`, `pucno`, `puc_expdate`, `body`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'V name', 'vtype', 'vehicle_no', 'capacity', 'make', 'description', '2022-05-22', '2022-05-22', 'engineno', 'chasisno', 'pucno', '2022-05-24', '', 1, '2022-05-24', '2022-05-27'),
(14, 'kamal', 'Heavy', '454', '45', '45', 'Description', '2022-07-20', '2022-07-20', '5457', 'Chasis No', '45', '2022-07-21', 'Close', 1, '2022-07-22', '0000-00-00'),
(15, 'kamal', 'Heavy', '454', '45', '45', 'Description', '2022-07-18', '2022-07-18', '5457', 'Chasis No', '45', '2022-07-19', 'Close', 0, '2022-07-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles_tax_details`
--

CREATE TABLE `vehicles_tax_details` (
  `id` int(11) NOT NULL,
  `vehicles_id` int(11) NOT NULL,
  `tax_type` varchar(100) NOT NULL,
  `tax_amount` decimal(8,2) NOT NULL,
  `tax_start_date` date NOT NULL,
  `tax_end_date` date NOT NULL,
  `tax_description` text NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles_tax_details`
--

INSERT INTO `vehicles_tax_details` (`id`, `vehicles_id`, `tax_type`, `tax_amount`, `tax_start_date`, `tax_end_date`, `tax_description`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 'tax_type U', '100.00', '2022-05-27', '2022-05-27', 'tax_description', 1, '2022-04-13', '2022-05-27'),
(2, 1, 'tax_type U', '100.00', '2022-05-27', '2022-05-27', 'tax_description', 1, '2022-04-13', '2022-05-27'),
(91, 15, 'Insurance', '10.00', '2022-07-22', '2022-07-22', '455', 0, '2022-07-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` int(11) NOT NULL,
  `vehicle_type` varchar(200) NOT NULL,
  `tyre_qty` int(11) NOT NULL,
  `trash` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `vehicle_type`, `tyre_qty`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'vehicle_type update', 12, 0, '2022-04-18', '2022-04-19'),
(2, 'vehicle_type 2', 10, 0, '2022-04-19', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aknowledges`
--
ALTER TABLE `aknowledges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bill_payments`
--
ALTER TABLE `bill_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cash_memos`
--
ALTER TABLE `cash_memos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cash_memo_bills`
--
ALTER TABLE `cash_memo_bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cash_memo_bills_charges`
--
ALTER TABLE `cash_memo_bills_charges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_references`
--
ALTER TABLE `customer_references`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loading_trips`
--
ALTER TABLE `loading_trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loading_trips_charges`
--
ALTER TABLE `loading_trips_charges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loading_trip_transactions`
--
ALTER TABLE `loading_trip_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `local_memos`
--
ALTER TABLE `local_memos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `local_memo_charges`
--
ALTER TABLE `local_memo_charges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `local_memo_transactions`
--
ALTER TABLE `local_memo_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lorry_billings`
--
ALTER TABLE `lorry_billings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lorry_freights`
--
ALTER TABLE `lorry_freights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lorry_receipts`
--
ALTER TABLE `lorry_receipts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lorry_transactions`
--
ALTER TABLE `lorry_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_permissions`
--
ALTER TABLE `menu_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `money_transfers`
--
ALTER TABLE `money_transfers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_advices`
--
ALTER TABLE `payment_advices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_advice_charge`
--
ALTER TABLE `payment_advice_charge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_collections`
--
ALTER TABLE `payment_collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_collection_charge`
--
ALTER TABLE `payment_collection_charge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `petty_cash_transactions`
--
ALTER TABLE `petty_cash_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers_contact_person_details`
--
ALTER TABLE `suppliers_contact_person_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles_tax_details`
--
ALTER TABLE `vehicles_tax_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aknowledges`
--
ALTER TABLE `aknowledges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bill_details`
--
ALTER TABLE `bill_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bill_payments`
--
ALTER TABLE `bill_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cash_memos`
--
ALTER TABLE `cash_memos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cash_memo_bills`
--
ALTER TABLE `cash_memo_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cash_memo_bills_charges`
--
ALTER TABLE `cash_memo_bills_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `customer_references`
--
ALTER TABLE `customer_references`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `loading_trips`
--
ALTER TABLE `loading_trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loading_trips_charges`
--
ALTER TABLE `loading_trips_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loading_trip_transactions`
--
ALTER TABLE `loading_trip_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `local_memos`
--
ALTER TABLE `local_memos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `local_memo_charges`
--
ALTER TABLE `local_memo_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `local_memo_transactions`
--
ALTER TABLE `local_memo_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lorry_billings`
--
ALTER TABLE `lorry_billings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lorry_freights`
--
ALTER TABLE `lorry_freights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lorry_receipts`
--
ALTER TABLE `lorry_receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lorry_transactions`
--
ALTER TABLE `lorry_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `menu_permissions`
--
ALTER TABLE `menu_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `money_transfers`
--
ALTER TABLE `money_transfers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_advices`
--
ALTER TABLE `payment_advices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_advice_charge`
--
ALTER TABLE `payment_advice_charge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_collections`
--
ALTER TABLE `payment_collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_collection_charge`
--
ALTER TABLE `payment_collection_charge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petty_cash_transactions`
--
ALTER TABLE `petty_cash_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `suppliers_contact_person_details`
--
ALTER TABLE `suppliers_contact_person_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vehicles_tax_details`
--
ALTER TABLE `vehicles_tax_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
