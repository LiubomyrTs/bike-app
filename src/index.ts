import 'bootstrap/dist/css/bootstrap.css';

import { BikesDisplay } from './bikesDisplay';
import { DataSource } from './data/remoteDataSource';
import { Display } from './display';
import { ServiceListDisplay } from './serviceListDisplay';
import { DISPLAY_MODE } from './data/enums/displayMode';
import { CheckDisplay } from './checkDisplay';

const refreshRootElement = (elem) => {
  let rootElement = document.getElementById('app');
  rootElement.innerHTML = '';
  rootElement.appendChild(elem);
}

let ds = new DataSource();
let mode = DISPLAY_MODE.CHECK_MODAL;

const changeDisplayMode = async (updatedMode: DISPLAY_MODE) => {
  mode = updatedMode;
  refreshRootElement(displayData());
}

const displayData = () => {
  let display: Display;
  switch(mode) {
    case DISPLAY_MODE.BIKES: display = new BikesDisplay();
      break;
    case DISPLAY_MODE.SERVICE_LIST: display = new ServiceListDisplay();
      break;
    case DISPLAY_MODE.CHECK_MODAL: display = new CheckDisplay();
      break;
    default: display = new BikesDisplay();
  }

  display.props = {
    dataSource: ds,
    changeDisplayMode: changeDisplayMode
  }

  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    refreshRootElement(displayData());
  }
};

