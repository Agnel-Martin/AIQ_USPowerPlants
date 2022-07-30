-- Table Config file
DROP IF EXISTS aiq;
CREATE DATABASE aiq;

create table uspp_1(
    SEQPLT20 INTEGER PRIMARY KEY,   --For Plant File Sequence Number
    PSTATABB VARCHAR(255)           --To store Plant State Loc
    PNAME VARCHAR(255),             --To store Plant Name
    LAT DOUBLE PRECISION,           --To store Plant Latitiude
    LON DOUBLE PRECISION,           --To store Plant Longititde
    PLNGENAN DOUBLE PRECISION,      --To store Plant Annual Net Generation (MWh)
);
