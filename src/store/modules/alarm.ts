import { Commit, ActionTree } from 'vuex';
import * as types from '../mutation-types';
import { AxiosResponse } from 'axios';
import graph from '@/graph';

export interface AlarmParams {
  paging: number;
  type: string;
}

export interface Alarm {
  message: string;
  key: string;
  startTime: string;
}

export interface State {
  alarmService: Alarm[];
  total: number;
}

const initState: State = {
  alarmService: [],
  total: 0,
};

// getters
const getters = {
};

// mutations
const mutations = {
  [types.SET_ALARM](state: State, data: Alarm[]) {
    state.alarmService = data;
  },
  [types.SET_ALARM_TOTAL](state: State, total: number) {
    state.total = total;
  },
  [types.CLEAR_ALARM](state: State) {
    state.alarmService = [];
  },
};

// actions
const actions: ActionTree<State, any> = {
  GET_ALARM(context: { commit: Commit; state: State}, params: AlarmParams) {
    // const { paging, type } = params;
    return graph
      .query('queryAlarms')
      .params(params)
      .then((res: AxiosResponse) => {
        context.commit(types.SET_ALARM, res.data.data.getAlarm.items);
        context.commit(types.SET_ALARM_TOTAL, res.data.data.getAlarm.total);
      });
  },
  CLEAR_ALARM(context: { commit: Commit; state: State }) {
    context.commit(types.CLEAR_ALARM);
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
