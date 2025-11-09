-- liquibase formatted sql

-- changeset perpetual:add-timestamps-to-rounds
ALTER TABLE rounds
ADD COLUMN createdAt TIMESTAMP DEFAULT NOW(),
ADD COLUMN updatedAt TIMESTAMP DEFAULT NOW();
