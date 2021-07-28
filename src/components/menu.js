export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        link:'/',
        badge: {
            variant: "info",
            text: "menuitems.dashboards.badge"
        },
    },

    {
        id: 3,
        label: "menuitems.enquiries.text",
        icon: "mdi mdi-account",
      
        badge: {
            variant: "info",
            text: "menuitems.enquiries.badge"
        },
        subItems: [
            {
                id: 4,
                label: "menuitems.enquiries.list.lead",
                link: "/lead",
                parentId: 3
            },
            {
                id: 5,
                label: "menuitems.enquiries.list.enquiry",
                link: "/enquiry",
                parentId: 3
            },
            {
                id: 6,
                label: "menuitems.enquiries.list.follow",
                link: "/follow",
                parentId: 3
            }
        ]
    },
    {
        id: 7,
        label: "menuitems.students.text",
        icon: "mdi mdi-account-circle",
        link:'/',
        badge: {
            variant: "info",
            text: "menuitems.students.badge"
        },
        subItems: [
            {
                id: 8,
                label: "menuitems.students.list.lead",
                link: "/",
                parentId: 7
            },
            {
                id: 9,
                label: "menuitems.students.list.enquiry",
                link: "/dashboard/saas",
                parentId: 7
            },
            {
                id: 10,
                label: "menuitems.students.list.follow",
                link: "/dashboard/crypto",
                parentId: 7
            }
        ]
    },
    {
        id: 11,
        label: "menuitems.courses.text",
        icon: "mdi mdi-account-circle",
        badge: {
            variant: "info",
            text: "menuitems.courses.badge"
        },
        subItems: [
            {
                id: 12,
                label: "menuitems.courses.list.course",
                link: "/course",
                parentId: 11
            },
            {
                id: 14,
                label: "menuitems.courses.list.batch",
                link: "/batch",
                parentId: 11
            },
            {
                id: 15,
                label: "menuitems.courses.list.subject",
                link: "/dashboard/crypto",
                parentId: 11
            }
        ]
    },
  ];

