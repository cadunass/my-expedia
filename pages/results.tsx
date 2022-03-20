import { NextPage } from 'next';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import { mockedHotels } from '../utils';
import { Hotel } from '../interfaces';
import Image from 'next/image';
import Datepicker from '../components/Datepicker';

const Results: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  let { place, checkin, checkout } = router.query;

  const shuffled = mockedHotels.filter(
    (hotel: Hotel) =>
      hotel.name?.includes(place as string) ||
      hotel.title?.includes(place as string)
  );
  let selected = shuffled.slice(0, 10);

  console.log(selected);

  const popularFilters = [
    { title: 'Hot tub', name: 'hot-tub' },
    { title: 'Ingleses Beach', name: 'ingleses-beach' },
    { title: 'Ocean view', name: 'ocean-view' },
    { title: 'All inclusive', name: 'all-inclusive' },
    { title: 'Spa', name: 'spa' },
  ];

  return (
    <Layout>
      <main>
        <div className='h-full w-full flex flex-col justif p-0 m-0 box-border bg-gray-200 border-t border-solid border-gray-400 px-20'>
          <div className='flex justify-center mt-6'>
            <form
              className='mb-4 flex justify-center'
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();

                const target = e.target as typeof e.target & {
                  place: { value: string };
                  checkin: { value: string };
                  checkout: { value: string };
                };

                console.log(place, checkin, checkout);

                Router.push({
                  pathname: '/results',
                  query: {
                    place: target.place.value,
                    checkin: target.checkin.value,
                    checkout: target.checkout.value,
                  },
                });
              }}
            >
              <input
                className='w-full border border-solid rounded-lg border-gray-400 p-4 mr-2'
                name='place'
                id='place'
                type='text'
                placeholder='Going to'
                defaultValue={place}
                onChange={(e) => (place = e.target.value)}
              />
              <Datepicker name='checkin' value={checkin} />
              <Datepicker name='checkout' value={checkout} />
              <button
                className='bg-blue-600 rounded-lg p-4 text-white'
                type='submit'
              >
                Search
              </button>
            </form>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col w-40 h-full mr-4'>
              <span className='mb-4 font-medium'>Filter by</span>
              <span className='mb-2'>Popular filters</span>
              {popularFilters.map((filter) => (
                <div key={filter.name} className='mb-1'>
                  <input type='checkbox' name={filter.name} />
                  <span className='ml-2'>{filter.title}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col w-full h-full ml-4'>
              <ol>
                {selected.map((item) => {
                  if (!item.image_direct_url) {
                    item.image_direct_url =
                      'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tadoussac_-_Hotel_%281%29.jpg';
                  }

                  return (
                    <li key={item.id}>
                      <div
                        className='flex flex-row bg-white rounded-lg mb-3 hover:cursor-pointer'
                        onClick={() => alert('TODO')}
                      >
                        <Image
                          src={item.image_direct_url as string}
                          alt={item.alt as string}
                          width={300}
                          height={160}
                        />
                        <div className='mx-4 my-2 w-full h-full'>
                          <div className='flex flex-col'>
                            <h3 className='font-bold'>{item.title}</h3>
                            <span>{item.name}</span>
                            <span className='text-xs font-light'>
                              {item.hours}
                            </span>
                          </div>
                          <span className='flex flex-row justify-end font-medium'>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Results;
