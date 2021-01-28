import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPrograms } from '../actions/programs';


function Filter(props) {

    const years = [
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
    ]

    const [activeYear, setActiveYear] = useState(null);
    const [activeLaunchStatus, setActiveLaunchStatus] = useState(null);
    const [activeLandStatus, setActiveLandStatus] = useState(null);
    const [currentSection, setCurrentSection] = useState(null);

    const handleYearChange = (year) => {
        setCurrentSection('year');
        setActiveYear(year);
        let url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${year}`;
        if (activeLaunchStatus) {
            url += `&launch_success=${activeLaunchStatus}`;
        }
        if (activeLandStatus) {
            url += `&land_success=${activeLandStatus}`;
        }
        props.fetchPrograms({ url });
    }

    const handleLaunchChange = (launchStatus) => {
        setCurrentSection('launch');
        setActiveLaunchStatus(launchStatus);
        let url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchStatus}`;
        if (activeLandStatus === false || activeLandStatus) {
            url += `&land_success=${activeLandStatus}`;
        }
        if (activeYear) {
            url += `&launch_year=${activeYear}`;
        }
        props.fetchPrograms({ url });
    }

    const handleLandChange = (landStatus) => {
        setCurrentSection('land');
        setActiveLandStatus(landStatus);
        let url = `https://api.spaceXdata.com/v3/launches?limit=100&land_success=${landStatus}`;
        if (activeLaunchStatus === false || activeLaunchStatus) {
            url += `&launch_success=${activeLaunchStatus}`;
        }
        if (activeYear) {
            url += `&launch_year=${activeYear}`;
        }
        props.fetchPrograms({ url });
    }

    const handleListner = (e) => {
        if (e.code === 'Tab') {
            e.preventDefault();
            if (activeYear && currentSection === 'year') {
                let currentYear;
                if (years.indexOf(parseInt(activeYear)) === years.length - 1) {
                    currentYear = years[0];
                }
                else {
                    currentYear = years[years.indexOf(parseInt(activeYear)) + 1];
                }

                handleYearChange(currentYear);
            }
            else if ((activeLaunchStatus === false || activeLaunchStatus) && currentSection === 'launch') {
                handleLaunchChange(!activeLaunchStatus);
            }
            else if ((activeLandStatus === false || activeLandStatus) && currentSection === 'land') {
                handleLandChange(!activeLandStatus);
            }
        }

    }

    useEffect(() => {
        window.addEventListener('keydown', handleListner);
        return () => {
            window.removeEventListener('keydown', handleListner);
        };
    },);

    return (
        <>
            <h3>Filters</h3>
            <div className="filter-label">
                <label>Launch Year</label>
            </div>
            <section className="filter-section">
                {years.map(year => (
                    <div key={year} className="year">
                        <span className={activeYear === year ? 'active-year-link' : ''}
                            onClick={() => handleYearChange(year)}>{year}</span>
                    </div>
                ))}
            </section>
            <div className="filter-label">
                <label>Successful Launch</label>
            </div>
            <section className="filter-section">
                <div className="year">
                    <span className={activeLaunchStatus === true ? 'active-year-link' : ''}
                        onClick={() => handleLaunchChange(true)}>True</span>
                </div>
                <div className="year">
                    <span className={activeLaunchStatus === false ? 'active-year-link' : ''}
                        onClick={() => handleLaunchChange(false)}>False</span>
                </div>
            </section>
            <div className="filter-label">
                <label>Successful Landing</label>
            </div>
            <section className="filter-section">
                <div className="year">
                    <span className={activeLandStatus === true ? 'active-year-link' : ''}
                        onClick={() => handleLandChange(true)}>True</span>
                </div>
                <div className="year">
                    <span className={activeLandStatus === false ? 'active-year-link' : ''}
                        onClick={() => handleLandChange(false)}>False</span>
                </div>
            </section>
        </>
    )
}

export default connect(null, { fetchPrograms })(Filter);
