CREATE TABLE bs_project_login.users (
	userID int not null auto_increment primary key,
	username varchar(50) not null unique,
	email varchar(50) not null unique,
    password varchar(20) not null
);

create table bs_project_login.images (
	data_url varchar(50) primary key,
    userID int,
    foreign key (userID) references users(userID)
    );

create table bs_project_login.missions (
	missionID int auto_increment primary key not null,
    userID int not null,
    create_time datetime,
    mission_status char, 
    takerID int,
    foreign key (userID) references users(userID),
    foreign key (takerID) references users(userID)
);

create table bs_project_login.images2missions (
	i2mID int not null auto_increment primary key,
	imageURL varchar(100),
	missionID int not null,
    foreign key (missionID) references missions(missionID),
    foreign key (imageURL) references images(data_url) 
);
