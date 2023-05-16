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
  `kategorija` ENUM("Klasiskās ģitāras", "Akustiskās ģitāras", "Elektriskās ģitāras", "Basģitāras", "Ukuleles") NOT NULL,
  `razotajs` VARCHAR(45) NOT NULL,
  `modelis` VARCHAR(45) NOT NULL,
  `ipasibas` JSON NOT NULL,
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
  `cena` DECIMAL(6,2) NOT NULL,
  `pieejamiba` INT NOT NULL,
  `attelu_celi` JSON NOT NULL,
  `pievienosanas_datums` DATETIME NOT NULL DEFAULT NOW(),
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
  `status` ENUM("Gaida apmaksu", "Sagatavo izsūtīšanai", "Izsūtīts", "Izpildīts", "Atcelts") NOT NULL DEFAULT 'Gaida apmaksu',
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `ERD`.`administratori`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Sofija', 'Freiberga', 'sofija.freiberga@inbox.lv', '$2b$10$Tz9/uyaY1sDFo/UGE1wCDubGtMFMHvaQIqOW9Od43J/hqpW268VeC');
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Melita', 'Truslīte', 'melita123@inbox.lv', '$2b$10$h5WgcRRIUpNRYbZAr3on2OZdCBWvWgPmE59ylZQVeeb3rNRHsGMQG');
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Persijs', 'Svilāns', 'persijsSv@gmail.com', '$2b$10$4KW9mIAhxVusdspURQtShurdWG7XgHmFahHJ71fbh817svZpWujM6');
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Diāna', 'Zālmane', 'zalmaneDiana@gmail.com', '$2b$10$GCC0hzDSWmzTit2IObD/ceGf.u10IUd.2JLSuVHhjIYySbAOvU7mW');
INSERT INTO `ERD`.`administratori` (`administratori_id`, `vards`, `uzvards`, `epasts`, `parole`) VALUES (DEFAULT, 'Anvars', 'Dinvietis', 'anvarslielais@inbox.lv', '$2b$10$4oxuINju0RP8/UNBw01mzeKGFyaSyFgZCt2VcIVloiqa2dHcsCJ0S');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`adreses`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '4123', 'Liepāja', NULL, NULL, 'Ērgļu iela', NULL, '373');
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1234', NULL, 'Saldus novads', 'Zaņas pagasts', NULL, 'Ķerīši', NULL);
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '2365', NULL, 'Tukuma novads', 'Tumes pagasts', NULL, NULL, 'g34');
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1239', 'Olaine', NULL, NULL, 'Zirņu iela', 'Zemnieki', NULL);
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '6583', NULL, 'Rēzeknes novads', 'Sakstagala pagasts', NULL, NULL, '732');
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '6251', 'Daugavpils', NULL, NULL, 'Laivu iela', 'Klieti', NULL);
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1008', 'Baldone', NULL, NULL, 'Grīņu iela', NULL, 'b86rb');
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1078', 'Rīga', NULL, NULL, 'Ceriņu iela', 'Samti', NULL);
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '1875', NULL, 'Cēsu novads', 'Vaives pagasts', NULL, 'Druvas', NULL);
INSERT INTO `ERD`.`adreses` (`adreses_id`, `pasta_indekss`, `pilseta`, `novads`, `pagasts`, `iela`, `majas_nos`, `dzivokla_nr`) VALUES (DEFAULT, '2980', NULL, 'Valkas novads', 'Kārkļu pagasts', NULL, NULL, 'b45d');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`lietotaji`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Tālis', 'Jēgers', '38515913', 'talis.jegers@inbox.lv', '$2b$10$/78jsfmT7cWAdFb1dI90/Oa3et.1GfcvWCDkzsGK.N6Lq0RD0LchK', DEFAULT, 1);
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Guntra', 'Strēlniece', '84658400', 'guntra_strelniece@gmail.com', '$2b$10$aaw8Tp4Jg37jS4E6ksUbv.xNV0cegPwJ3a7t0/nSUj7FmyIL4MXxi', DEFAULT, 3);
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Vladimirs', 'Audumiņš', '36558033', 'vladimirs99@gmail.com', '$2b$10$l9ZC4IIrmaTMFdEo7sJR9OEullhd0emCyUsrM6IHlLpi1SqP4.3jC', DEFAULT, 4);
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Tāle', 'Ruiķe', '62036354', 'ruke@inbox.lv', '$2b$10$G5qW.NoexA6.SAZiqvGHhe5YhFh6ysqtNuyGWeMQvFHUCRa/AnG/y', DEFAULT, 5);
INSERT INTO `ERD`.`lietotaji` (`lietotaji_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `parole`, `izveidosanas_datums`, `id_adreses`) VALUES (DEFAULT, 'Valfrīds', 'Hammers', '99157513', 'hammers01@inbox.lv', '$2b$10$LjsuubVrHI9aikbFUoC2oOJ/uPrBfD1s.y.pxALH8.wlgrUjNOuKW', DEFAULT, 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`precu_specifikacija`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Klasiskās ģitāras', 'Valencia', 'VC102', '{\"Ģitāras izmērs\": \"1/2 (paredzēta 5-7 gadus veciem bērniem)\", \"Ģitāras augšējā deka\": \"Liepa\", \"Ģitāras sāni un apakša\": \"Liepa\", \"Grifa virsma\": \"Kļava\", \"Ģitāras tilts\": \"Kļava\", \"Augšējā slieksnīša platums\": \"45mm\", \"Krāsa\": \"Dabisks koks (lakots)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Klasiskās ģitāras', 'Valencia', 'VC704', '{\"Ģitāras augšējā deka\": \"Egles koks (Solid top - masīvkoks)\", \"Ģitāras sāni un apakša\": \"Sarkankoks\", \"Grifa virsma\": \"Amara melnkoks\", \"Ģitāras tilts\": \"Amara melnkoks\", \"Ģitāras grifs\": \"Regulējams (Dual action truss rod)\", \"Ģitāras augšējais slieksnītis\": \"Graph Tech NuBone\", \"Ģitāras apakšējais slieksnītis\": \"Graph Tech NuBone XB\", \"Skalas garums\": \"650mm\", \"Krāsa\": \"Dabīga koka (matēta)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Klasiskās ģitāras', 'Salvador', 'CS-244', '{\"Ģitāras augšējā deka\": \"Egle\", \"Ģitāras sāni un apakša\": \"Sapele\", \"Grifa virsma\": \"Riekstkoks\", \"Ģitāras tilts\": \"Riekstkoks\", \"Ģitāras grifs\": \"Regulējams (Dual action truss rod)\", \"Augšējā slieksnīša platums\": \"52mm\", \"Stīgas\": \"Savarez\", \"Skalas garums\": \"650mm\", \"Krāsa\": \"Dabīga koka (matēta)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Klasiskās ģitāras', 'Salvador Cortez', 'CS-90', '{\"Ģitāras augšējā deka\": \"Egle (Solid - masīvkoks)\", \"Ģitāras sāni un apakša\": \"Sarkankoks (Solid - masīvkoks)\", \"Grifs\": \"Sarkankoks (regulējams)\", \"Grifa virsma\": \"Indijas rožkoks\", \"Ģitāras tilts\": \"Indijas rožkoks\", \"Skalas garums\": \"650mm\", \"Grifa platums\": \"52mm\", \"Augšējais slieksnītis\": \"Kauls\", \"Apakšējais slieksnītis\": \"Kauls\", \"Stīgas\": \"Savarez Corum 500-AJ\", \"Krāsa\": \"Dabīga koka (lakota)\", \"Komplektā\": \"Salvador Cortez cietā soma\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Klasiskās ģitāras', 'M.Rodriguez', 'T-65', '{\"Ģitāras izmērs\": \"4/4 (paredzēta pieaugušajiem un bērniem no 14 gadu vecuma)\", \"Ģitāras augšējā deka\": \"Ciedrs (masīvkoks)\", \"Ģitāras sāni un apakša\": \"Sarkankoks\", \"Grifa virsma\": \"Ovangkol\", \"Grifs\": \"Sarkankoks\", \"Skalas garums\": \"650mm\", \"Augšējā slieksnīša platums\": \"52mm\", \"Ģitāras tiltiņš\": \"Ovangkol\", \"Stīgu novilcēji\": \"Van Gent (Holande)\", \"Stīgas\": \"Hannabach 815HTC (Vācija)\", \"Krāsa\": \"Dabīga koka (matēta zīda laka)\", \"Ražots\": \"Eiropā\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Akustiskās ģitāras', 'Nashville', 'GSD-6034-SB', '{\"Ģitāras izmērs\": \"3/4\", \"Ģitāras augšējā deka\": \"Liepa\", \"Ģitāras apakšējā virsma un sānu malas\": \"Liepa\", \"Grifs\": \"Austrumu sarkankoks\", \"Grifa virsma\": \"Kļava\", \"Ģitāras tilts\": \"Kļava\", \"Stīgu novilcēji\": \"Hromēti\", \"Stīgas\": \"Metāla\", \"Grifa regulēšanas stienis\": \"Dual Action\", \"Krāsa\": \"Sunburst\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Akustiskās ģitāras', 'Cort', 'AD810-BKS', '{\"Ģitāras augšējā deka\": \"Egle\", \"Ģitāras sāni un apakša\": \"Sarkankoks\", \"Korpusa stiprinājums\": \"Advanced X-Bracing\", \"Grifs\": \"Sarkankoks\", \"Grifa virsma\": \"Merbau\", \"Ģitāras tilts\": \"Merbau\", \"Augšējā slieksnīša platums\": \"43mm\", \"Stīgu novilcēji\": \"Die Cast\", \"Stīgas\": \"JUMBO 6ST (012,016,024,038,041,052)\", \"Grifa regulēšanas stienis\": \"Dual Action\", \"Krāsa\": \"Melna (matēta)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Akustiskās ģitāras', 'Nashville', 'GSD-60-CENT', '{\"Korpusa virsma\": \"Egle\", \"Grifs\": \"Riekstkoks\", \"Ģitāras tilts\": \"Riekstkoks\", \"Stīgu novilcēji\": \"Hromēti\", \"Elektronika\": \"Aktīvā ar iebūvētu elektronisko skaņotāju\", \"Konektori\": \"6,3mm jack\", \"Grifa regulēšanas stienis\": \"Dual Action\", \"Krāsa\": \"Dabiska koka, lakota\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Akustiskās ģitāras', 'Richwood', 'RD-12-CERS', '{\"Ģitāras augšējā deka\": \"Egles koks\", \"Ģitāras apakšējā virsma un sānu malas\": \"Basswood\", \"Grifs\": \"Sarkankoks\", \"Grifa virsma\": \"Akācija\", \"Ģitāras tilts\": \"Akācija\", \"Stīgu novilcēji\": \"Die Cast Chrome\", \"Stīgas\": \"D\'Addario\", \"Elektronika\": \"Aktīvā ar 3-joslu ekvalaizeri un iebūvētu ģitāras skaņotāju\", \"Krāsa\": \"Sarkana\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Akustiskās ģitāras', 'Cort', 'AD810-12-OP', '{\"Ģitāras augšējā deka\": \"Egle\", \"Ģitāras sāni un apakša\": \"Sarkankoks\", \"Korpusa stiprinājums\": \"Advanced X-Bracing\", \"Grifs\": \"Sarkankoks\", \"Grifa virsma\": \"Rožkoks\", \"Ģitāras tilts\": \"Rožkoks\", \"Stīgu novilcēji\": \"Die Cast\", \"Stīgas\": \"JUMBO 12ST (012,016,024,038,041,052)\", \"Grifa regulēšanas stienis\": \"Dual Action\", \"Krāsa\": \"Dabiska koka (matēts - Open pore)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Elektriskās ģitāras', 'Arrow', 'ST-111-BKW', '{\"Korpuss\": \"Papele\", \"Grifs\": \"Kanādas kļava\", \"Grifa virsma\": \"Rožkoks\", \"Augšēja slieksnīša platums\": \"42 mm\", \"Stīgu novilcēji\": \"Chrome\", \"Ladas\": \"21\", \"Kontrole\": \"Skaļuma un 2 x toņa regulators, 5-pozīciju pārslēdzējs\", \"Skaņas noņēmēji\": \"3 x Single coil\", \"Krāsa\": \"Melna\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Elektriskās ģitāras', 'Arrow', 'TL-11', '{\"Korpuss\": \"Papele\", \"Grifs\": \"Kanādas kļava\", \"Grifa virsma\": \"Kanādas kļava\", \"Ladas\": \"22\", \"Stīgas\": \"Darco\", \"Kontrole\": \"Trīs pozīciju pārslēdzējs, skaļuma un toņa regulators\", \"Skaņas noņēmēji\": \"Single-Single circuit\", \"Krāsa\": \"Dabīga kļava\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Elektriskās ģitāras', 'Cort', 'G100-OPW', '{\"Korpuss\": \"Meranti\", \"Grifs\": \"Kļava (Bolt-on)\", \"Grifa virsma\": \"Merbau\", \"Grifa sadalījums\": \"22\", \"Ģitāras tilts\": \"Fixed bridge\", \"Stīgu novilcēji\": \"Cap\", \"Stīgas\": \"D\'Addario EXL110 (010-046)\", \"Kontrole\": \"Piecu pozīciju pārslēdzējs, skaļuma un toņa regulatori\", \"Skaņas noņēmēji\": \"Powersound single coil x 3\", \"Krāsa\": \"Brūna (matēta)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Elektriskās ģitāras', 'Cort', 'G110-OPBC', '{\"Korpuss\": \"Poplar\", \"Grifs\": \"Kļava (Bolt-on)\", \"Grifa virsma\": \"Jatoba\", \"Augšēja slieksnīša platums\": \"42 mm\", \"Grifa sadalījums\": \"22\", \"Ģitāras tilts\": \"6 Point Vintage Tremolo\", \"Stīgu novilcēji\": \"Die-Cast\", \"Stīgas\": \"Coated\", \"Kontrole\": \"Piecu pozīciju pārslēdzējs, skaļuma un toņa regulators\", \"Skaņas noņēmēji\": \"Cort® Powersound HSS Pickup Set\", \"Krāsa\": \"Sarkana (matēta)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Elektriskās ģitāras', 'Arrow', 'SG22-CH', '{\"Korpuss\": \"Sarkankoks\", \"Grifs\": \"Sarkankoks\", \"Grifa virsma\": \"Rožkoks\", \"Ladas\": \"22\", \"Stīgas\": \"Darco\", \"Kontrole\": \"Trīs pozīciju pārslēdzējs, 2 x skaļuma un 2 x toņa regulatori\", \"Skaņas noņēmēji\": \"2 x Hambucker\", \"Krāsa\": \"Sarkana (Cherry)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Basģitāras', 'Arrow', 'Session-Bass-4-BK', '{\"Forma\": \"Precision Bass\", \"Korpuss\": \"Papele\", \"Grifs\": \"Kanādas Kļava\", \"Grifa virsma\": \"Rožkoks\", \"Grifa sadalījums\": \"21\", \"Kontrole\": \"1 Volume, 1 Tone Passive Electronics\", \"Skaņas noņēmēji\": \"Precision Bass tipa noņēmēji\", \"Krāsa\": \"Melna\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Basģitāras', 'Cort', 'Action-PJ-OPB', '{\"Korpuss\": \"Poplar\", \"Grifs\": \"Kļava (Bolt-on)\", \"Grifa virsma\": \"Merbau\", \"Grifa sadalījums\": \"24\", \"Skalas garums\": \"34\'\'(864mm)\", \"Stīgu novilcēji\": \"Diecast Chrome\", \"Kontrole\": \"Volume 1 (Neck Pickup), Volume 2 (Bridge Pickup), Master Tone\", \"Skaņas noņēmēji\": \"Powersound PSEB4-4/F & PSEB1-4/R\", \"Krāsa\": \"Melna (matēta Open Pore)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Basģitāras', 'Cort', 'Action-Bass-Plus-TR', '{\"Korpuss\": \"Poplar\", \"Grifs\": \"Kļava (Bolt-on)\", \"Grifa virsma\": \"Jatoba\", \"Grifa sadalījums\": \"24\", \"Skalas garums\": \"34\'\'(864mm)\", \"Stīgu novilcēji\": \"Diecast Chrome\", \"Elektronika\": \"2-joslu aktīvā\", \"Kontrole\": \"Master Volume, Balancer, Bass Boost/Cut, Treble Boost/Cut\", \"Skaņas noņēmēji\": \"PSEB4-4/F & PSEB1-4/R Pickups\", \"Krāsa\": \"Sarkana (lakota)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Basģitāras', 'Cort', 'GB24JJ-2T', '{\"Korpuss\": \"Poplar\", \"Grifs\": \"Kļava (Bolt-on)\", \"Grifa virsma\": \"Jatoba\", \"Grifa sadalījums\": \"20\", \"Skalas garums\": \"34\'\'(864mm)\", \"Stīgu novilcēji\": \"Chrome\", \"Kontrole\": \"2 Volume, 1 Tone Passive Electronics\", \"Skaņas noņēmēji\": \"Cort® Powersound JJ Style Pickup Set\", \"Krāsa\": \"2 Tone Burst\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Basģitāras', 'Ibanez', 'GSR200SM-NGT', '{\"Korpuss\": \"Papele ar kļavas virsmu (Spalted maple)\", \"Grifs\": \"Kļava\", \"Grifa virsma\": \"Jatoba\", \"Grifa sadalījums\": \"22\", \"Skalas garums\": \"34\'\'(864mm)\", \"Kontrole\": \"2 x skaļums, 1 x tonis\", \"Elektronika\": \"Phat ll EQ\", \"Krāsa\": \"Brūna (Natural Grey Burst)\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Ukuleles', 'Mahalo', 'MK1-TRD', '{\"Ģitāras korpuss\": \"Sengon\", \"Grifa virsma\": \"Sarkankoks\", \"Grifs\": \"Kļava\", \"Skalas garums\": \"346 mm\", \"Ladas\": \"12\", \"Stīgas\": \"Neilona\", \"Krāsa\": \"Sarkana (matēta)\", \"Komplektā\": \"Ukuleles soma\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Ukuleles', 'Korala', 'UKS-30-RD', '{\"Ģitāras korpuss\": \"Kļava\", \"Grifa virsma\": \"Kļava\", \"Grifs\": \"Kļava\", \"Ladas\": \"12\", \"Krāsa\": \"Sarkana\", \"Komplektā\": \"Ukuleles soma\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Ukuleles', 'Mahalo', 'MR1-BK', '{\"Ģitāras korpuss\": \"Sarkankoks\", \"Grifa virsma\": \"Kļava\", \"Grifs\": \"Kļava\", \"Ladas\": \"12\", \"Stīgas\": \"Aquila Nylgut\", \"Krāsa\": \"Melna\", \"Komplektā\": \"Ukuleles soma\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Ukuleles', 'Mahalo', 'MR1-WT', '{\"Ģitāras korpuss\": \"Sarkankoks\", \"Grifa virsma\": \"Kļava\", \"Grifs\": \"Kļava\", \"Ladas\": \"12\", \"Stīgas\": \"Aquila Nylgut\", \"Krāsa\": \"Balta\", \"Komplektā\": \"Ukuleles soma\"}');
INSERT INTO `ERD`.`precu_specifikacija` (`precu_specifikacija_id`, `kategorija`, `razotajs`, `modelis`, `ipasibas`) VALUES (DEFAULT, 'Ukuleles', 'Mahalo', 'MH1-VNA', '{\"Izmērs\": \"Soprāns\", \"Ģitāras korpuss\": \"Sengon\", \"Grifa virsma\": \"Tīkkoks\", \"Grifs\": \"Sarkankoks\", \"Tiltiņš\": \"Tīkkoks\", \"Ladas\": \"12 (niķeļa)\", \"Stīgas\": \"Aquila Super Nylgut\", \"Apakšējais slieksnītis\": \"Graph Tech NuBone XB\", \"Krāsa\": \"Dzintara (lakota)\", \"Komplektā\": \"Ukuleles soma\"}');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`preces`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, '1/2 Klasiskā ģitāra Valencia VC102', 69.00, 2, '[\"/User/Categories/ClassicalGuitars/VC102_Valencia-600x600.jpg\"]', '2024-04-15 12:12:12', 1);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Klasiskā ģitāra Valencia VC704', 189.00, 5, '[\"/User/Categories/ClassicalGuitars/VC704_Valencia-800x800.jpg\"]', DEFAULT, 2);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Klasiskā ģitāra Salvador CS-244', 149.00, 1, '[\"/User/Categories/ClassicalGuitars/CS_244_Salvador-600x600.jpg\"]', DEFAULT, 3);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Klasiskā ģitāra Salvador Cortez CS-90', 769.00, 1, '[\"/User/Categories/ClassicalGuitars/CS_90_Salvador_Cortez-600x600.jpg\"]', '2023-04-15 10:12:12', 4);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Klasiskā ģitāra M.Rodriguez Tradicion T-65', 349.00, 3, '[\"/User/Categories/ClassicalGuitars/Tradicion_T-65_Rodriguez-min-600x600.jpeg\"]', '2023-04-15 12:11:11', 5);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, '3/4 Akustiskā ģitāra Nashville GSD-6034-SB', 79.00, 1, '[\"/User/Categories/AcousticGuitars/GSD_6034_SB_Nashville-600x600.jpg\"]', DEFAULT, 6);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Akustiskā ģitāra Cort AD810 BKS', 139.00, 26, '[\"/User/Categories/AcousticGuitars/AD810BKS_Cort-600x600.jpeg\"]', DEFAULT, 7);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektro akustiskā ģitāra Nashville GSD-60-CENT', 139.00, 2, '[\"/User/Categories/AcousticGuitars/GSD_60_CENT_Nashville-600x600.jpg\"]', DEFAULT, 8);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektro-akustiskā ģitāra Richwood RD-12-CERS', 189.00, 2, '[\"/User/Categories/AcousticGuitars/RD_12_CERS_Richwood_gitara-600x600.jpg\"]', DEFAULT, 9);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, '12-stīgu akustiskā ģitāra Cort AD810-12 OP', 179.00, 4, '[\"/User/Categories/AcousticGuitars/AD810_12_string_Cort-600x600.jpg\"]', '2024-04-15 9:12:12', 10);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektriskā ģitāra Arrow ST-111-BKW', 129.00, 4, '[\"/User/Categories/ElectricGuitars/ST_111_Deep_Black_Rosewood_Arrow-600x600.jpg\"]', DEFAULT, 11);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektriskā ģitāra Arrow TL-11', 139.00, 2, '[\"/User/Categories/ElectricGuitars/TL-11_Arrow-600x600.jpeg\"]', DEFAULT, 12);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektriskā ģitāra Cort G100 OPW', 149.00, 1, '[\"/User/Categories/ElectricGuitars/G100_OPW_Cort-600x600.jpg\"]', DEFAULT, 13);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektriskā ģitāra Cort G110 OPBC', 189.00, 4, '[\"/User/Categories/ElectricGuitars/G110-OPBC-Cort-600x600.jpeg\"]', DEFAULT, 14);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Elektriskā ģitāra Arrow SG22 CH', 199.00, 10, '[\"/User/Categories/ElectricGuitars/SG22_Arrow-600x600.jpeg\"]', DEFAULT, 15);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Basģitāra Arrow Session Bass 4 Black', 169.00, 2, '[\"/User/Categories/BassGuitars/Session-Bass-4-Arrow-600x600.jpeg\"]', '2024-04-15 10:12:12', 16);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Basģitāra Cort Action PJ-OPB', 215.00, 2, '[\"/User/Categories/BassGuitars/Action_PJ_OPB_Cort-600x600.jpeg\"]', DEFAULT, 17);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Basģitāra Cort Action Bass Plus TR', 235.00, 1, '[\"/User/Categories/BassGuitars/Action_Bass_Plus_TR_Cort-600x600.jpeg\"]', DEFAULT, 18);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Basģitāra Cort GB24JJ 2T', 269.00, 4, '[\"/User/Categories/BassGuitars/GB24JJ-2T-Cort-600x600.jpeg\"]', DEFAULT, 19);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Basģitāra Ibanez GSR200SM-NGT', 319.00, 3, '[\"/User/Categories/BassGuitars/GSR200SMNGT2-600x600.jpg\"]', DEFAULT, 20);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Soprāna ukulele Mahalo MK1-TRD', 29.00, 4, '[\"/User/Categories/Ukuleles/MK1trd_Mahalo-600x600.jpg\"]', DEFAULT, 21);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Ukuleles komplekts Korala UKS-30-RD', 29.00, 2, '[\"/User/Categories/Ukuleles/UKS30_RD_Korala-600x600.jpg\"]', '2024-04-15 11:12:12', 22);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Ukuleles komplekts Mahalo MR1-BK', 32.00, 56, '[\"/User/Categories/Ukuleles/MR1bk_Mahalo-600x600.jpg\"]', DEFAULT, 23);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Ukuleles komplekts Mahalo MR1-WT', 32.00, 62, '[\"/User/Categories/Ukuleles/MR1_WT_Mahalo-600x600.jpg\"]', DEFAULT, 24);
INSERT INTO `ERD`.`preces` (`preces_id`, `nosaukums`, `cena`, `pieejamiba`, `attelu_celi`, `pievienosanas_datums`, `id_precu_specifikacija`) VALUES (DEFAULT, 'Soprāna ukulele Mahalo MH1-VNA', 37.00, 5, '[\"/User/Categories/Ukuleles/MH1VNA_Mahalo-600x600.jpg\"]', DEFAULT, 25);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`atsauksmes`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 3, NULL, 1, 1);
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 5, 'Iesaku!', 3, 3);
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 4, 'Noņēmu zvaigzni par sliktām stīgām.', 25, 2);
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 5, NULL, 21, 1);
INSERT INTO `ERD`.`atsauksmes` (`atsauksmes_id`, `izveidosanas_datums`, `vertejums`, `komentars`, `id_preces`, `id_lietotaji`) VALUES (DEFAULT, DEFAULT, 5, 'Uzbūve ir ļoti labas kvalitātes.', 8, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`neregistreti_klienti`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Dzelde', 'Cilinske', '01617780', 'dzelde.cilinske@inbox.lv', 2);
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Junora', 'Patmalniece', '68784092', 'junora_1@inbox.lv', 7);
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Austrums', 'Uzkalns', '65888359', 'austrumsaustrums@gmail.com', 8);
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Sulamīte', 'Ūpe', '24986523', 'upe_sulamite@inbox.lv', 9);
INSERT INTO `ERD`.`neregistreti_klienti` (`neregistreti_klienti_id`, `vards`, `uzvards`, `talrunis`, `epasts`, `id_adreses`) VALUES (DEFAULT, 'Igmārs', 'Maizītis', '43170059', 'igmars@gmail.com', 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`pasutijumi`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 1, NULL, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 1, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 2, NULL, 'Sagatavo izsūtīšanai', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 2, 'Izsūtīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 3, 'Sagatavo izsūtīšanai', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 4, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, NULL, 5, 'Izsūtīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 3, NULL, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 3, NULL, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 4, NULL, 'Izsūtīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 5, NULL, 'Izpildīts', DEFAULT);
INSERT INTO `ERD`.`pasutijumi` (`pasutijumi_id`, `id_lietotaji`, `id_neregistreti_klienti`, `status`, `izveidosanas_datums`) VALUES (DEFAULT, 5, NULL, 'Sagatavo izsūtīšanai', DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `ERD`.`pasutijumi_preces`
-- -----------------------------------------------------
START TRANSACTION;
USE `ERD`;
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 1, 1, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 2, 25, 2);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 3, 3, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 3, 25, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 4, 2, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 5, 4, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 6, 14, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 6, 4, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 6, 1, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 7, 2, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 8, 24, 2);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 8, 14, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 9, 17, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 10, 13, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 11, 24, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 11, 13, DEFAULT);
INSERT INTO `ERD`.`pasutijumi_preces` (`pasutijumi_preces_id`, `id_pasutijumi`, `id_preces`, `skaits`) VALUES (DEFAULT, 12, 13, DEFAULT);

COMMIT;

