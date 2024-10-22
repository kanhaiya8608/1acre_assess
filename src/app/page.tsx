import GoogleMapComponent from '../components/GoogleMapComponent';

async function getProperties() {
  const res = await fetch('https://prod-be.1acre.in/lands/landmaps/?seller_id=211');
  
  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }

  return res.json();
}

export default async function Home() {
  const properties = await getProperties(); 

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold pb-2'>Property Map</h1>
      <GoogleMapComponent properties={properties} />
    </div>
  );
}
