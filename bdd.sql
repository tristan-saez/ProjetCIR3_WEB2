#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: condition_athmo
#------------------------------------------------------------

CREATE TABLE condition_athmo(
        athmo Varchar (200) NOT NULL
	,CONSTRAINT condition_athmo_PK PRIMARY KEY (athmo)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: condition_lum
#------------------------------------------------------------

CREATE TABLE condition_lum(
        lum Varchar (200) NOT NULL
	,CONSTRAINT condition_lum_PK PRIMARY KEY (lum)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: condition_route
#------------------------------------------------------------

CREATE TABLE condition_route(
        route Varchar (200) NOT NULL
	,CONSTRAINT condition_route_PK PRIMARY KEY (route)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ville
#------------------------------------------------------------

CREATE TABLE ville(
        insee Varchar (20) NOT NULL ,
        ville Varchar (200) NOT NULL
	,CONSTRAINT ville_PK PRIMARY KEY (insee)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: condition_secu
#------------------------------------------------------------

CREATE TABLE condition_secu(
        dispo_secu Varchar (200) NOT NULL
	,CONSTRAINT condition_secu_PK PRIMARY KEY (dispo_secu)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: accident
#------------------------------------------------------------

CREATE TABLE accident(
        id_acc           Int NOT NULL ,
        horodatage       Datetime NOT NULL ,
        latitude         Float NOT NULL ,
        longitude        Float NOT NULL ,
        an_naiss_conduct Datetime NOT NULL ,
        insee            Varchar (20) NOT NULL ,
        lum              Varchar (200) NOT NULL ,
        athmo            Varchar (200) NOT NULL ,
        route            Varchar (200) NOT NULL ,
        dispo_secu       Varchar (200) NOT NULL
	,CONSTRAINT accident_PK PRIMARY KEY (id_acc)

	,CONSTRAINT accident_ville_FK FOREIGN KEY (insee) REFERENCES ville(insee)
	,CONSTRAINT accident_condition_lum0_FK FOREIGN KEY (lum) REFERENCES condition_lum(lum)
	,CONSTRAINT accident_condition_athmo1_FK FOREIGN KEY (athmo) REFERENCES condition_athmo(athmo)
	,CONSTRAINT accident_condition_route2_FK FOREIGN KEY (route) REFERENCES condition_route(route)
	,CONSTRAINT accident_condition_secu3_FK FOREIGN KEY (dispo_secu) REFERENCES condition_secu(dispo_secu)
)ENGINE=InnoDB;

