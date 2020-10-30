type STATUS = 'I' | 'C' | 'S';

export interface ListItem {
  /**
   *
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  count: number;
  label: string;
  status: STATUS; // 状态
  childList?: ListItem[];
}

// 模拟数据
export const data: ListItem[] = [
  {
    id: 'g1',
    name: 'Name1',
    count: 123456,
    label: 'xx',
    status: 'S',
    childList: [
      {
        id: 'g12',
        name: 'Deal with Long label',
        count: 123456,
        label: 'xx',
        status: 'S',
        childList: [
          {
            id: 'g121',
            name: 'Name3',
            count: 123456,
            label: 'xx',
            status: 'S',
            childList: [
              {
                id: 'g1211',
                name: 'Name4',
                count: 123456,
                label: 'xx',
                status: 'I',
                childList: [],
              },
            ],
          },
          {
            id: 'g122',
            name: 'Name5',
            count: 123456,
            label: 'xx',
            status: 'S',
            childList: [
              {
                id: 'g1221',
                name: 'Name6',
                count: 123456,
                label: 'xx',
                status: 'S',
                childList: [
                  {
                    id: 'g12211',
                    name: 'Name6-1',
                    count: 123456,
                    label: 'xx',
                    status: 'I',
                    childList: [],
                  },
                ],
              },
              {
                id: 'g1222',
                name: 'Name7',
                count: 123456,
                label: 'xx',
                status: 'S',
                childList: [],
              },
            ],
          },
          {
            id: 'g123',
            name: 'Name8',
            count: 123456,
            label: 'xx',
            status: 'S',
            childList: [
              {
                id: 'g1231',
                name: 'Name8-1',
                count: 123456,
                label: 'xx',
                status: 'I',
                childList: [],
              },
            ],
          },
        ],
      },
      {
        id: 'g13',
        name: 'Name9',
        count: 123456,
        label: 'xx',
        status: 'S',
        childList: [
          {
            id: 'g131',
            name: 'Name10',
            count: 123456,
            label: 'xx',
            status: 'I',
            childList: [],
          },
          {
            id: 'g132',
            name: 'Name11',
            count: 123456,
            label: 'xx',
            status: 'I',
            childList: [],
          },
        ],
      },
      {
        id: 'g14',
        name: 'Name12',
        count: 123456,
        label: 'xx',
        status: 'I',
        childList: [],
      },
    ],
  },
];
