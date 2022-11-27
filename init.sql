CREATE DATABASE IF NOT EXISTS `mysqldb`;
USE `mysqldb`;
CREATE USER 'mysqlu'@'*' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON `mysqldb`.* TO 'mysqlu'@'*';
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `ami` (  `id` int(11) NOT NULL,  `animal_id` int(11) NOT NULL,  `human_id` int(11) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `animal` (`id` int(11) NOT NULL, `nom` varchar(64) NOT NULL, `age` tinyint(3) UNSIGNED NOT NULL, `genre` char(1) NOT NULL, `race` varchar(64) NOT NULL,`maitre_id` int(11) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `human` (`id` int(11) NOT NULL,`nom` varchar(64) NOT NULL,`age` tinyint(3) UNSIGNED NOT NULL,`genre` char(1) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `ami`       ADD PRIMARY KEY (`id`),  ADD UNIQUE KEY `animal_human_id` (`animal_id`,`human_id`) USING BTREE,  ADD KEY `animal_id` (`animal_id`),  ADD KEY `human_id` (`human_id`);
ALTER TABLE `animal`    ADD PRIMARY KEY (`id`),  ADD KEY `maitre_id` (`maitre_id`);
ALTER TABLE `human`     ADD PRIMARY KEY (`id`);
ALTER TABLE `ami`       MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `animal`    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `human`     MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
