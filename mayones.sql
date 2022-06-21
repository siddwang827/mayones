-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: stylishapp-rds.c7gc3aviiyhc.us-east-1.rds.amazonaws.com    Database: mayones
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_position`
--

DROP TABLE IF EXISTS `category_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `job_position_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_position_category_category1_idx` (`category_id`),
  KEY `fk_position_category_job_position1_idx` (`job_position_id`),
  CONSTRAINT `fk_position_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_position_category_job_position1` FOREIGN KEY (`job_position_id`) REFERENCES `job_positions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_position`
--

LOCK TABLES `category_position` WRITE;
/*!40000 ALTER TABLE `category_position` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int unsigned NOT NULL,
  `owner_id` bigint NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `category` varchar(10) DEFAULT NULL,
  `short_description` varchar(100) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `address` varchar(60) DEFAULT NULL,
  `introduction` text,
  `philosophy` text,
  `story` text,
  `benifit` text,
  `logo_image` varchar(225) DEFAULT NULL,
  `banner_image` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `owner_id_UNIQUE` (`owner_id`),
  UNIQUE KEY `brand_UNIQUE` (`brand`),
  KEY `fk_companies_users1_idx` (`owner_id`),
  CONSTRAINT `fk_companies_users1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies_tags`
--

DROP TABLE IF EXISTS `companies_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies_tags` (
  `id` bigint NOT NULL,
  `companies_id` int unsigned NOT NULL,
  `tags_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employer_tags_employer_profile1_idx` (`companies_id`),
  KEY `fk_employer_tags_tags1_idx` (`tags_id`),
  CONSTRAINT `fk_employer_tags_employer_profile1` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `fk_employer_tags_tags1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies_tags`
--

LOCK TABLES `companies_tags` WRITE;
/*!40000 ALTER TABLE `companies_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_positions`
--

DROP TABLE IF EXISTS `job_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_positions`
--

LOCK TABLES `job_positions` WRITE;
/*!40000 ALTER TABLE `job_positions` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_in_interested`
--

DROP TABLE IF EXISTS `location_in_interested`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_in_interested` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seekers_id` int unsigned NOT NULL,
  `locations_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_location_in_interested_seekers1_idx` (`seekers_id`),
  KEY `fk_location_in_interested_locations1_idx` (`locations_id`),
  CONSTRAINT `fk_location_in_interested_locations1` FOREIGN KEY (`locations_id`) REFERENCES `location` (`id`),
  CONSTRAINT `fk_location_in_interested_seekers1` FOREIGN KEY (`seekers_id`) REFERENCES `seekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_in_interested`
--

LOCK TABLES `location_in_interested` WRITE;
/*!40000 ALTER TABLE `location_in_interested` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_in_interested` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `openings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `companies_id` int unsigned NOT NULL,
  `job_title` varchar(45) NOT NULL,
  `job_description` text,
  `skill_required` text,
  `prefered_qualification` text,
  `salary_top` int DEFAULT NULL,
  `salary_bottom` int DEFAULT NULL,
  `location` varchar(10) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `remote_work` tinyint DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  `category_position_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_opening_employer_profile1_idx` (`companies_id`),
  KEY `fk_openings_position_category1_idx` (`category_position_id`),
  CONSTRAINT `fk_opening_employer_profile1` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `fk_openings_position_category1` FOREIGN KEY (`category_position_id`) REFERENCES `category_position` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `openings`
--

LOCK TABLES `openings` WRITE;
/*!40000 ALTER TABLE `openings` DISABLE KEYS */;
/*!40000 ALTER TABLE `openings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_images`
--

DROP TABLE IF EXISTS `other_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `other_image` json DEFAULT NULL,
  `companies_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_other_image_employer_profile1_idx` (`companies_id`),
  CONSTRAINT `fk_other_image_employer_profile1` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_images`
--

LOCK TABLES `other_images` WRITE;
/*!40000 ALTER TABLE `other_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `other_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position_in_interested`
--

DROP TABLE IF EXISTS `position_in_interested`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position_in_interested` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seekers_id` int unsigned NOT NULL,
  `category_position_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_search_position_empolyee1_idx` (`seekers_id`),
  KEY `fk_employee_search_position_category_position1_idx` (`category_position_id`),
  CONSTRAINT `fk_employee_search_position_category_position1` FOREIGN KEY (`category_position_id`) REFERENCES `category_position` (`id`),
  CONSTRAINT `fk_employee_search_position_empolyee1` FOREIGN KEY (`seekers_id`) REFERENCES `seekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_in_interested`
--

LOCK TABLES `position_in_interested` WRITE;
/*!40000 ALTER TABLE `position_in_interested` DISABLE KEYS */;
/*!40000 ALTER TABLE `position_in_interested` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seekers`
--

DROP TABLE IF EXISTS `seekers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seekers` (
  `id` int unsigned NOT NULL,
  `users_id` bigint NOT NULL,
  `name` varchar(30) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `contact_phone` varchar(15) DEFAULT NULL,
  `contact_email` varchar(45) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '0',
  `expected_remote` varchar(45) DEFAULT NULL,
  `expected_location` varchar(45) DEFAULT NULL,
  `expected_salary` varchar(45) DEFAULT NULL,
  `face_image` varchar(255) DEFAULT NULL,
  `resume` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `expected_salary_UNIQUE` (`expected_salary`),
  KEY `fk_seekers_users1_idx` (`users_id`),
  CONSTRAINT `fk_seekers_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seekers`
--

LOCK TABLES `seekers` WRITE;
/*!40000 ALTER TABLE `seekers` DISABLE KEYS */;
/*!40000 ALTER TABLE `seekers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seekers_openings`
--

DROP TABLE IF EXISTS `seekers_openings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seekers_openings` (
  `id` bigint NOT NULL,
  `empolyee_id` int unsigned NOT NULL,
  `openings_id` bigint unsigned NOT NULL,
  `follow` tinyint DEFAULT NULL,
  `application` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_empolyee_following_empolyee_profile1_idx` (`empolyee_id`),
  KEY `fk_empolyee_following_opening1_idx` (`openings_id`),
  CONSTRAINT `fk_empolyee_following_empolyee_profile10` FOREIGN KEY (`empolyee_id`) REFERENCES `seekers` (`id`),
  CONSTRAINT `fk_empolyee_following_opening10` FOREIGN KEY (`openings_id`) REFERENCES `openings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seekers_openings`
--

LOCK TABLES `seekers_openings` WRITE;
/*!40000 ALTER TABLE `seekers_openings` DISABLE KEYS */;
/*!40000 ALTER TABLE `seekers_openings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_role_idx` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-21 23:39:28
