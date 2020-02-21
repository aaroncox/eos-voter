import { get } from 'dot-prop-immutable';

export default function fetchMaturedBalance(tables, account) {
  const rexMaturities = get(tables, `eosio.eosio.rexbal.${account}.rows.0.rex_maturities`, []);
  let maturedMaturitiesTotal = 0;

  rexMaturities.forEach(maturity => {
    if (new Date(`${maturity.key}Z`) < new Date()) {
      maturedMaturitiesTotal += Number(maturity.value);
    }
  });

  const maturedRexNumber = Number(get(tables, `eosio.eosio.rexbal.${account}.rows.0.matured_rex`, 0));

  return `${(maturedRexNumber + maturedMaturitiesTotal) / 10000} REX`;
}
