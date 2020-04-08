CREATE TABLE `Conversor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataCotacao` varchar(11) NOT NULL,
  `moedaOrigem` varchar(5) NOT NULL,
  `moedaFinal` varchar(5) NOT NULL,
  `valorDesejado` decimal(12,2) NOT NULL,
  `dataHoraCriacao` datetime DEFAULT NULL,
  `totalPrecoCompra` decimal(18,4) DEFAULT NULL,
  `totalPrecoVenda` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ConversorIdx` (`dataCotacao`,`moedaOrigem`,`moedaFinal`,`valorDesejado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `FilaConversor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posicao` int(11) DEFAULT NULL,
  `moedaOrigem` varchar(5) DEFAULT NULL,
  `moedaFinal` varchar(5) DEFAULT NULL,
  `valorDesejado` decimal(12,2) DEFAULT NULL,
  `dataCotacao` varchar(11) DEFAULT NULL,
  `dataHoraCriacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



