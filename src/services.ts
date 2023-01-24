export function calculateBrCharges(salary: number) {
  if (salary < 257129) {
    const inss: number = salary * 0.09;
    const ir: number = (salary - inss) * 0.075 - 1428;
    const inss_patronal: number = salary * 0.268;
    const fgts: number = salary * 0.08;
    const salario_liquido: number = salary - inss - ir;

    return {
      gross_salary: `R$ ${(salary / 100).toFixed(2)}`,
      net_salary: `R$ ${(salario_liquido / 100).toFixed(2)}`,
      inss: `R$ ${(inss / 100).toFixed(2)}`,
      ir: `R$ ${(ir / 100).toFixed(2)}`,
      inss_business: `R$ ${(inss_patronal / 100).toFixed(2)}`,
      fgts: `R$ ${(fgts / 100).toFixed(2)}`,
    };
  } else if (salary > 385695 && salary < 750749) {
    const inss: number = salary * 0.14;
    const inss_patronal: number = salary * 0.268;
    const fgts: number = salary * 0.08;
    
    const aux: number = (salary - inss)
    let ir: number;
    if (aux < 466468) ir = aux * 0.225 - 63613;
    else ir = aux * 0.275 - 86936;

    const salario_liquido: number = salary - inss - ir;

    return {
        gross_salary: `R$ ${(salary / 100).toFixed(2)}`,
        net_salary: `R$ ${(salario_liquido / 100).toFixed(2)}`,
        inss: `R$ ${(inss / 100).toFixed(2)}`,
        ir: `R$ ${(ir / 100).toFixed(2)}`,
        inss_business: `R$ ${(inss_patronal / 100).toFixed(2)}`,
        fgts: `R$ ${(fgts / 100).toFixed(2)}`,
      };
  } else {
    const inss: number = 750749 * 0.14;
    const ir: number = (salary - inss) * 0.275 - 86936;
    const inss_patronal: number = salary * 0.268;
    const fgts: number = salary * 0.08;
    const salario_liquido: number = salary - inss - ir;

    return {
      gross_salary: `R$ ${(salary / 100).toFixed(2)}`,
      net_salary: `R$ ${(salario_liquido / 100).toFixed(2)}`,
      inss: `R$ ${(inss / 100).toFixed(2)}`,
      ir: `R$ ${(ir / 100).toFixed(2)}`,
      inss_business: `R$ ${(inss_patronal / 100).toFixed(2)}`,
      fgts: `R$ ${(fgts / 100).toFixed(2)}`,
    };
  }
}
