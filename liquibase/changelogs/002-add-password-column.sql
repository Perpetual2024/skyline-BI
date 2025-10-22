--liquibase formatted sql

--changeset perpetual:add-password-column
ALTER TABLE users
ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT 'temporary';
