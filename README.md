### PROJECT DESCRIPTION

# Script for running the Project
yarn start

# Home Page route for managing campaigns
/bs-campaigns

## Component Structure
  1. Stateless ---- Dumb reusable components
  2. Stateful ---- Containers made up of several stateless components with states and access to redux state (if used in the project)
  3. Views ---- Actual views made up of several containers which gets rendered on a route

# Stateless
  1. Header ---- Common App Header
  2. Layout ---- Common App layout, to be used in every view for wrapping of containers
  3. Tabs --- tabs component for making tabs in the desktop view

# Stateful
  1. Landing ---- Main landing page for managing campaigns

# Views
  1. Home ---- Home view made up using the 'Landing' container, rendered on 'bs-campaigns' route