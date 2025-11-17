import { getJobs } from '@/api/jobApi';
import { useSession, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/use-fetch';
import { BarLoader } from "react-spinners";
import JobCard from '../job-card';

const JobListing = () => {

  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [location, setLocation] = useState('');

  const { fn: fetchJobs, data: jobsData, isLoading } = useFetch(getJobs, {
    location,
    company_id: companyId,
    query: searchQuery
  });

  useEffect(() => {
    if (isLoaded) {
      fetchJobs();
    }
  }, [isLoaded, location, companyId, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }
  useEffect(() => {
    if (jobsData) {
      console.log("jobsData INSIDE useEffect after fetch =>", jobsData);
    }
  }, [jobsData]);
  console.log("jobsData INSIDE useEffect after fetch =>123", jobsData);
  return (
    <div className='flex flex-col items-center justify-center'> 
      <h1 className='gradient-title text-6xl sm:text-7xl font-extrabold pb-8'>
        Latest Jobs
      </h1>
      {
        isLoading && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        )
      }

      {
        isLoading === false && (
          <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              jobsData?.length ? (
                jobsData?.map((job) => {
                  return <JobCard key={job?.id} job={job}/>
                })
              ) : (
                <div>No jobs found 😥</div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default JobListing;