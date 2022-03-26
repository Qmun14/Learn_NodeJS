import {URL} from 'url';

const qm = new URL("https://www.arsenal.com/tickets/ticket-categories-and-pricing/register?new=members");

qm.host = "www.lazymales.com"
qm.searchParams.append("status", "permium");

console.log(qm.toString());
console.log(qm.href);
console.log(qm.protocol);
console.log(qm.host);
console.log(qm.pathname);
console.log(qm.searchParams);