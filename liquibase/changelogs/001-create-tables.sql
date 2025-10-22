
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, 
    username VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    crash_point FLOAT,
    state VARCHAR(50),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    server_seed VARCHAR(255),
    client_seed VARCHAR(255),
    total_bets INT,
    total_payout INT
);

CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL,
    account_ref VARCHAR(100),
    balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL,
    round_id UUID NOT NULL,
    amount DECIMAL(10, 2),
    auto_cashout DECIMAL(10, 2),
    cashout_multiplier INT,
    win_amount DECIMAL(10, 2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cashed_at TIMESTAMP,
    CONSTRAINT fk_bet_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_bet_round FOREIGN KEY (round_id) REFERENCES rounds(id)
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    account_id UUID NOT NULL,
    round_id UUID NOT NULL,
    type VARCHAR(50),
    amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tx_account FOREIGN KEY (account_id) REFERENCES account(id),
    CONSTRAINT fk_tx_round FOREIGN KEY (round_id) REFERENCES rounds(id)
);

