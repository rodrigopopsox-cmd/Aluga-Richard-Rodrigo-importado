window.ALUGA_DATA={
user:{name:'Rodrigo Alves',role:'Administrador'},
units:[
{id:'A-402',property:'Ed. Aurora',unit:'402',type:'2 quartos · 68 m²',tenant:'Marina Costa',rent:3200,status:'Ocupado',due:'05/11'},
{id:'A-1203',property:'Ed. Aurora',unit:'1203',type:'3 quartos · 94 m²',tenant:'—',rent:4800,status:'Livre',due:'—'},
{id:'P-118',property:'Residencial Pinheiros',unit:'118',type:'1 quarto · 42 m²',tenant:'João Pedro Lima',rent:2750,status:'Atrasado',due:'28/10'},
{id:'P-207',property:'Residencial Pinheiros',unit:'207',type:'Studio · 31 m²',tenant:'Carla Mendes',rent:2100,status:'Ocupado',due:'10/11'},
{id:'J-01',property:'Casa Jardins',unit:'Casa 01',type:'4 quartos · 210 m²',tenant:'Família Rocha',rent:9800,status:'Ocupado',due:'01/11'},
{id:'A-805',property:'Ed. Aurora',unit:'805',type:'2 quartos · 70 m²',tenant:'Reserva · Lucas F.',rent:3350,status:'Reservado',due:'—'},
{id:'V-33',property:'Vila Madalena Lofts',unit:'33',type:'Loft · 55 m²',tenant:'Beatriz Nunes',rent:3900,status:'Ocupado',due:'15/11'}
],
tasks:[
{id:1,title:'Vistoria do ar-condicionado',where:'Ed. Aurora · 402',progress:100,tone:'dark',people:[{name:'Ana Lima'},{name:'Bruno Reis'}],status:'Concluída',due:'20/10'},
{id:2,title:'Revisão do elevador',where:'Ed. Aurora · bloco B',progress:67,tone:'light',people:[{name:'Caio Dias'},{name:'Duda Melo'},{name:'Enzo Paz'}],status:'Em andamento',due:'26/10'},
{id:3,title:'Reparo hidráulico',where:'Pinheiros · 118',progress:43,tone:'brand',people:[{name:'Felipe Sá'}],status:'Urgente',due:'24/10'},
{id:4,title:'Pintura da fachada',where:'Casa Jardins',progress:20,tone:'light',people:[{name:'Gabi Luz'}],status:'Agendada',due:'04/11'}
],
payments:[
{id:1,who:'Marina Costa',unit:'Aurora · 402',value:3200,date:'05/11',status:'A vencer'},
{id:2,who:'João Pedro Lima',unit:'Pinheiros · 118',value:2750,date:'28/10',status:'Atrasado'},
{id:3,who:'Família Rocha',unit:'Jardins · Casa 01',value:9800,date:'01/10',status:'Pago'},
{id:4,who:'Carla Mendes',unit:'Pinheiros · 207',value:2100,date:'10/10',status:'Pago'},
{id:5,who:'Beatriz Nunes',unit:'Vila Madalena · 33',value:3900,date:'15/10',status:'Pago'}
],
revenue:{Dia:[10.4,12.1,11.2,16.4,23.6,15.2,18.4,14.4,17.9],Semana:[84,92,88,101,118,109,124,116,121],'Mês':[310,342,356,371,388,402,431,447,468]},
visitors:{a:[3,2.6,4.2,5.1,4.9,6.8,8.1,7.6,9.4,10.8],b:[1,1.2,1.1,2.4,2.2,3.1,3.6,3.4,4.6,5.4]}
};
window.brl=v=>'R$ '+Number(v).toLocaleString('pt-BR');
window.STATUS_TONE={'Ocupado':'success','Pago':'success','Concluída':'success','Livre':'neutral','Reservado':'soft','Atrasado':'danger','Urgente':'danger','A vencer':'warning','Em andamento':'warning','Agendada':'neutral'};
