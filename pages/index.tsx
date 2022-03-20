import type { NextPage } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import Datepicker from '../components/Datepicker';
import Router from 'next/router';
import { mockedHotels } from '../utils';

const Home: NextPage = () => {
  const shuffled = mockedHotels.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 9);

  console.log(selected);
  return (
    <Layout>
      <main className='p-0 m-0 box-border'>
        <form
          className='p-8'
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();

            const target = e.target as typeof e.target & {
              place: { value: string };
              checkin: { value: string };
              checkout: { value: string };
            };
            const place = target.place.value;
            const checkin = target.checkin.value;
            const checkout = target.checkout.value;

            console.log(place, checkin, checkout);

            Router.push({
              pathname: '/results',
              query: { place, checkin, checkout },
            });
          }}
        >
          <div className='p-8 border border-solid border-gray-300 rounded-lg'>
            <div className='mb-4 flex justify-center'>
              <input
                className='w-full border border-solid rounded-lg border-gray-400 p-4 mr-2'
                name='place'
                id='place'
                type='text'
                placeholder='Going to'
              />
              <Datepicker name='checkin' />
              <Datepicker name='checkout' />
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                className='bg-blue-600 rounded-lg p-4 text-white'
                type='submit'
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Home;
