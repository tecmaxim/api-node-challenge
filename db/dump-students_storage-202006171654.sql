-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: students_storage
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.19.10.1

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
-- Table structure for table `payment_methods`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `installments` mediumtext,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `payment_methods_description_IDX` (`description`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Visa','[1,3,6]',1),(2,'Master','[1,3,6]',1);
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `idStudent` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `career` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `phone` int unsigned DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `isActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idStudent`),
  KEY `students_name_IDX` (`name`,`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'maxi','mai@mail.com','syst','1988-10-10',4564454,'Arg','sal',1),(2,'maxi','mai@mail.com','syst','1988-10-10',4564454,'Arg','sal',1),(4,'Maxissss','tecmaxim@gmail.com','Comunications','1988-10-10',123213123,'Arg','LaChola',0),(5,'Maxi','tecmaxim@gmail.com','Comunications','1988-10-10',123213123,'Arg','LaChola',1),(21,'Maxi','tecmaxim@gmail.com','Comunications','1988-10-10',123213123,'Arg','LaChola',1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_payment_method`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_payment_method` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idStudent` int NOT NULL,
  `idPayment` int NOT NULL,
  `installments` int DEFAULT NULL,
  `isActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `students_paymets_option_fk_students` (`idStudent`),
  KEY `students_paymets_option_FK_payments_methods` (`idPayment`),
  CONSTRAINT `students_paymets_option_FK_payments_methods` FOREIGN KEY (`idPayment`) REFERENCES `payment_methods` (`id`),
  CONSTRAINT `students_paymets_option_fk_students` FOREIGN KEY (`idStudent`) REFERENCES `students` (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_payment_method`
--

LOCK TABLES `students_payment_method` WRITE;
/*!40000 ALTER TABLE `students_payment_method` DISABLE KEYS */;
INSERT INTO `students_payment_method` VALUES (1,2,1,NULL,1),(2,4,1,6,0),(3,5,1,3,1),(17,21,1,3,1);
/*!40000 ALTER TABLE `students_payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'students_storage'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-17 16:54:23
