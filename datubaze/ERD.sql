-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ERD
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ERD` ;

-- -----------------------------------------------------
-- Schema ERD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ERD` DEFAULT CHARACTER SET utf8 ;
USE `ERD` ;

-- -----------------------------------------------------
-- Table `ERD`.`administratori`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`administratori` ;

CREATE TABLE IF NOT EXISTS `ERD`.`administratori` (
  `administratori_id` INT NOT NULL AUTO_INCREMENT,
  `vards` VARCHAR(45) NOT NULL,
  `uzvards` VARCHAR(45) NOT NULL,
  `epasts` VARCHAR(100) NOT NULL,
  `parole` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`administratori_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `administratori_id_UNIQUE` ON `ERD`.`administratori` (`administratori_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `lietotajvards_UNIQUE` ON `ERD`.`administratori` (`epasts` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`adreses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`adreses` ;

CREATE TABLE IF NOT EXISTS `ERD`.`adreses` (
  `adreses_id` INT NOT NULL AUTO_INCREMENT,
  `pasta_indekss` VARCHAR(7) NOT NULL,
  `pilseta` VARCHAR(60) NULL,
  `novads` VARCHAR(60) NULL,
  `pagasts` VARCHAR(60) NULL,
  `iela` VARCHAR(60) NULL,
  `majas_nos` VARCHAR(60) NULL,
  `dzivokla_nr` VARCHAR(60) NULL,
  PRIMARY KEY (`adreses_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `adreses_id_UNIQUE` ON `ERD`.`adreses` (`adreses_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`lietotaji`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`lietotaji` ;

CREATE TABLE IF NOT EXISTS `ERD`.`lietotaji` (
  `lietotaji_id` INT NOT NULL AUTO_INCREMENT,
  `vards` VARCHAR(45) NOT NULL,
  `uzvards` VARCHAR(45) NOT NULL,
  `talrunis` VARCHAR(12) NOT NULL,
  `epasts` VARCHAR(100) NOT NULL,
  `parole` VARCHAR(100) NOT NULL,
  `izveidosanas_datums` DATETIME NOT NULL DEFAULT NOW(),
  `id_adreses` INT NOT NULL,
  PRIMARY KEY (`lietotaji_id`, `id_adreses`),
  CONSTRAINT `fk_lietotaji_adreses`
    FOREIGN KEY (`id_adreses`)
    REFERENCES `ERD`.`adreses` (`adreses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `lietotaji_id_UNIQUE` ON `ERD`.`lietotaji` (`lietotaji_id` ASC) VISIBLE;

CREATE INDEX `fk_lietotaji_adreses_idx` ON `ERD`.`lietotaji` (`id_adreses` ASC) VISIBLE;

CREATE UNIQUE INDEX `epasts_UNIQUE` ON `ERD`.`lietotaji` (`epasts` ASC) VISIBLE;

CREATE UNIQUE INDEX `talrunis_UNIQUE` ON `ERD`.`lietotaji` (`talrunis` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`precu_specifikacija`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`precu_specifikacija` ;

CREATE TABLE IF NOT EXISTS `ERD`.`precu_specifikacija` (
  `precu_specifikacija_id` INT NOT NULL AUTO_INCREMENT,
  `kategorija` ENUM("Klasiskā ģitāra") NOT NULL,
  `razotajs` VARCHAR(45) NOT NULL,
  `modelis` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`precu_specifikacija_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `precu_apraksts_id_UNIQUE` ON `ERD`.`precu_specifikacija` (`precu_specifikacija_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`preces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`preces` ;

CREATE TABLE IF NOT EXISTS `ERD`.`preces` (
  `preces_id` INT NOT NULL AUTO_INCREMENT,
  `nosaukums` VARCHAR(60) NOT NULL,
  `cena` DECIMAL NOT NULL,
  `pieejamiba` INT NOT NULL,
  `id_precu_specifikacija` INT NOT NULL,
  PRIMARY KEY (`preces_id`, `id_precu_specifikacija`),
  CONSTRAINT `fk_preces_precu_specifikacija1`
    FOREIGN KEY (`id_precu_specifikacija`)
    REFERENCES `ERD`.`precu_specifikacija` (`precu_specifikacija_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `preces_id_UNIQUE` ON `ERD`.`preces` (`preces_id` ASC) VISIBLE;

CREATE INDEX `fk_preces_precu_specifikacija1_idx` ON `ERD`.`preces` (`id_precu_specifikacija` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`atsauksmes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`atsauksmes` ;

CREATE TABLE IF NOT EXISTS `ERD`.`atsauksmes` (
  `atsauksmes_id` INT NOT NULL AUTO_INCREMENT,
  `izveidosanas_datums` DATETIME NOT NULL DEFAULT NOW(),
  `vertejums` INT(1) NOT NULL,
  `komentars` VARCHAR(255) NULL,
  `id_preces` INT NOT NULL,
  `id_lietotaji` INT NOT NULL,
  PRIMARY KEY (`atsauksmes_id`, `id_preces`, `id_lietotaji`),
  CONSTRAINT `fk_atsauksmes_preces1`
    FOREIGN KEY (`id_preces`)
    REFERENCES `ERD`.`preces` (`preces_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atsauksmes_klienti1`
    FOREIGN KEY (`id_lietotaji`)
    REFERENCES `ERD`.`lietotaji` (`lietotaji_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `atsauksmes_id_UNIQUE` ON `ERD`.`atsauksmes` (`atsauksmes_id` ASC) VISIBLE;

CREATE INDEX `fk_atsauksmes_preces1_idx` ON `ERD`.`atsauksmes` (`id_preces` ASC) VISIBLE;

CREATE INDEX `fk_atsauksmes_klienti1_idx` ON `ERD`.`atsauksmes` (`id_lietotaji` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`neregistreti_klienti`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`neregistreti_klienti` ;

CREATE TABLE IF NOT EXISTS `ERD`.`neregistreti_klienti` (
  `neregistreti_klienti_id` INT NOT NULL AUTO_INCREMENT,
  `vards` VARCHAR(45) NOT NULL,
  `uzvards` VARCHAR(45) NOT NULL,
  `talrunis` VARCHAR(12) NOT NULL,
  `epasts` VARCHAR(100) NOT NULL,
  `id_adreses` INT NOT NULL,
  PRIMARY KEY (`neregistreti_klienti_id`, `id_adreses`),
  CONSTRAINT `fk_lietotaji_adreses0`
    FOREIGN KEY (`id_adreses`)
    REFERENCES `ERD`.`adreses` (`adreses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_lietotaji_adreses_idx` ON `ERD`.`neregistreti_klienti` (`id_adreses` ASC) VISIBLE;

CREATE UNIQUE INDEX `neregistreti_klienti_id_UNIQUE` ON `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`pasutijumi`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`pasutijumi` ;

CREATE TABLE IF NOT EXISTS `ERD`.`pasutijumi` (
  `pasutijumi_id` INT NOT NULL AUTO_INCREMENT,
  `id_lietotaji` INT NULL,
  `id_neregistreti_klienti` INT NULL,
  `status` ENUM("Gaida apmaksu", "Sagatavo izsūtīšanai", "Izsūtīts", "Izpildīts") NOT NULL DEFAULT 'Gaida apmaksu',
  `izveidosanas_datums` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`pasutijumi_id`),
  CONSTRAINT `fk_pasutijumi_lietotaji1`
    FOREIGN KEY (`id_lietotaji`)
    REFERENCES `ERD`.`lietotaji` (`lietotaji_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pasutijumi_lietotaji_copy11`
    FOREIGN KEY (`id_neregistreti_klienti`)
    REFERENCES `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `pasutijumi_id_UNIQUE` ON `ERD`.`pasutijumi` (`pasutijumi_id` ASC) VISIBLE;

CREATE INDEX `fk_pasutijumi_lietotaji1_idx` ON `ERD`.`pasutijumi` (`id_lietotaji` ASC) VISIBLE;

CREATE INDEX `fk_pasutijumi_lietotaji_copy11_idx` ON `ERD`.`pasutijumi` (`id_neregistreti_klienti` ASC) VISIBLE;

CREATE UNIQUE INDEX `id_neregistreti_klienti_UNIQUE` ON `ERD`.`pasutijumi` (`id_neregistreti_klienti` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`pasutijumi_preces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`pasutijumi_preces` ;

CREATE TABLE IF NOT EXISTS `ERD`.`pasutijumi_preces` (
  `pasutijumi_preces_id` INT NOT NULL AUTO_INCREMENT,
  `id_pasutijumi` INT NOT NULL,
  `id_preces` INT NOT NULL,
  `skaits` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`),
  CONSTRAINT `fk_pasutijumi_has_preces_pasutijumi1`
    FOREIGN KEY (`id_pasutijumi`)
    REFERENCES `ERD`.`pasutijumi` (`pasutijumi_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pasutijumi_has_preces_preces1`
    FOREIGN KEY (`id_preces`)
    REFERENCES `ERD`.`preces` (`preces_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_pasutijumi_has_preces_preces1_idx` ON `ERD`.`pasutijumi_preces` (`id_preces` ASC) VISIBLE;

CREATE INDEX `fk_pasutijumi_has_preces_pasutijumi1_idx` ON `ERD`.`pasutijumi_preces` (`id_pasutijumi` ASC) VISIBLE;

CREATE UNIQUE INDEX `pasutijumi_preces_id_UNIQUE` ON `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ERD`.`ipasibas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`ipasibas` ;

CREATE TABLE IF NOT EXISTS `ERD`.`ipasibas` (
  `ipasibas_id` INT NOT NULL AUTO_INCREMENT,
  `nosaukums` VARCHAR(100) NOT NULL,
  `vertiba` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ipasibas_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ERD`.`precu_specifikacija_ipasibas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ERD`.`precu_specifikacija_ipasibas` ;

CREATE TABLE IF NOT EXISTS `ERD`.`precu_specifikacija_ipasibas` (
  `precu_specifikacija_ipasibas_id` INT NOT NULL AUTO_INCREMENT,
  `id_precu_specifikacija` INT NOT NULL,
  `id_ipasibas` INT NOT NULL,
  PRIMARY KEY (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`),
  CONSTRAINT `fk_precu_specifikacija_has_ipasibas_precu_specifikacija1`
    FOREIGN KEY (`id_precu_specifikacija`)
    REFERENCES `ERD`.`precu_specifikacija` (`precu_specifikacija_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_precu_specifikacija_has_ipasibas_ipasibas1`
    FOREIGN KEY (`id_ipasibas`)
    REFERENCES `ERD`.`ipasibas` (`ipasibas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_precu_specifikacija_has_ipasibas_ipasibas1_idx` ON `ERD`.`precu_specifikacija_ipasibas` (`id_ipasibas` ASC) VISIBLE;

CREATE INDEX `fk_precu_specifikacija_has_ipasibas_precu_specifikacija1_idx` ON `ERD`.`precu_specifikacija_ipasibas` (`id_precu_specifikacija` ASC) VISIBLE;

CREATE UNIQUE INDEX `precu_specifikacija_ipasibas_id_UNIQUE` ON `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `ERD`.`administratori`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Sofija', 'Freiberga', 'sofija.freiberga@inbox.lv', 'Parole1');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`adreses`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '4123', 'Liepāja', NULL, NULL, 'Ērgļu iela', NULL, '373');
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1234', NULL, 'Saldus novads', 'Zaņas pagasts', NULL, 'Ķerīši', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`lietotaji`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Tālis', 'Jēgers', '38515913', 'talis.jegers@inbox.lv', 'Parole1', DEFAULT, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`precu_specifikacija`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`) VALUES (DEFAULT, 'Klasiskā ģitāra', 'Valencia', 'VC102');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`preces`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `id_precu_specifikacija`) VALUES (DEFAULT, '1/2 Classical guitar Valencia VC102', 69.00, 2, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`atsauksmes`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 3, NULL, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`neregistreti_klienti`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Dzelde', 'Cilinske', '01617780', 'dzelde.cilinske@inbox.lv', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`pasutijumi`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 1, NULL, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 1, 'Izpildīts', DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`pasutijumi_preces`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 1, 1, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 2, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`ipasibas`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Ģitāras izmērs', '1/2 (paredzēta 5-7 gadus veciem bērniem)');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Ģitāras augšējā deka', 'Liepa');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Ģitāras sāni un apakša', 'Liepa');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Grifa virsma', 'Kļava');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Ģitāras tilts', 'Kļava');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Augšējā slieksnīša platums', '45mm');
INSERT INTO `ERD`.`ipasibas` (`ipasibas_id`, `nosaukums`, `vertiba`) VALUES (DEFAULT, 'Krāsa', 'Dabisks koks (lakots)');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`precu_specifikacija_ipasibas`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 1);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 2);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 3);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 4);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 5);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 6);
INSERT INTO `ERD`.`precu_specifikacija_ipasibas` (`precu_specifikacija_ipasibas_id`, `id_precu_specifikacija`, `id_ipasibas`) VALUES (DEFAULT, 1, 7);

COMMIT;

