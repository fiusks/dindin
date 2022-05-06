create TYpe transactionType as enum ('credit','debit');

create table if not exists transactions2 (
  id serial primary key,
  date date not null,
  description text,
  amount bigint not null,
  category text not null,
  type transactionType not null
  );