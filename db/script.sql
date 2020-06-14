CREATE DATABASE IF NOT EXISTS students_storage;

USE students_storage;
-- students_storage.students definition

CREATE TABLE `students` (
  `idStudent` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `caereer` varchar(200) DEFAULT NULL,
  `birthday` date NOT NULL,
  `phone` int unsigned DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  PRIMARY KEY (`idStudent`),
  KEY `students_name_IDX` (`name`,`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- students_storage.payment_methods definition

CREATE TABLE `payment_methods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `installments` INT(2) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_methods_description_IDX` (`description`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- students_storage.students_paymets_option definition

CREATE TABLE `students_paymets_option` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idStudent` int(10) NOT NULL,
  `idPayment` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `students_paymets_option_fk_students` (`idStudent`),
  KEY `students_paymets_option_FK_payments_methods` (`idPayment`),
  CONSTRAINT `students_paymets_option_FK_payments_methods` FOREIGN KEY (`idPayment`) REFERENCES `payment_methods` (`id`),
  CONSTRAINT `students_paymets_option_fk_students` FOREIGN KEY (`idStudent`) REFERENCES `students` (`idStudent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;