create database test;
\c test;

create table "header" (
    "id" SERIAL PRIMARY KEY,
    "logo" Text,
    "title" character varying(250),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table "categories" (
    "id" SERIAL PRIMARY KEY,
    "title" character varying(250),
    "lang_id" integer not null,
    "is_published" boolean DEFAULT false,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categories_lang_id_fk
        FOREIGN KEY (lang_id)
            REFERENCES languages(id)
            ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE languages(
    "id" serial PRIMARY KEY,
    "name" character varying(100),
    "short_name" character varying(10),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
insert into languages(name, short_name) values('turkmen', 'tm'), ('russian', 'ru'), ('english', 'en');

CREATE TABLE "products"(
    "id" serial PRIMARY KEY,
    "title" character varying(250),
    "price" float,
    "category_id" integer not null,
    "lang_id" integer not null,
    "phone" character varying(250),
    "image_path" Text,
    "about" character varying(250),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_category_id_fk
        FOREIGN KEY (category_id)
            REFERENCES categories(id)
            ON DELETE CASCADE ON UPDATE SET NULL,
    CONSTRAINT products_lang_id_fk
        FOREIGN KEY (lang_id)
            REFERENCES languages(id)
            ON DELETE CASCADE ON UPDATE CASCADE
);

alter table products add column view_count integer DEFAULT 0;

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "name" character varying(250),
    "surname" character varying(250),
    "email" character varying(250),
    "password" character varying(250),
    "verify_password" character varying(250),
    "avatar_path" character varying(250),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD UNIQUE(email);
ALTER TABLE users ADD column role character varying(250) DEFAULT null;-- Admin, User, Moderation and other..