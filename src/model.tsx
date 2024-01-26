import { SoftwareProperties } from "./modules/SoftPage/SoftPage";

const softwareArray: SoftwareProperties[] = [
    {
        software: {
            id: 1,
            name: 'Docker Engine',
            description: 'Docker платформа контейнеризации',
            version: 'v20.3.7',
            logo: null,
        },
        tags: [{
            id: 0,
            name: "Контейнеризация"
        }],
    },
    {
        software: {
            id: 2,
            name: 'Docker registry',
            description: 'Docker registry для хранения собранных образов',
            version: 'v20.3.7',
            logo: null,
        },
        tags: [{
            id: 0,
            name: "Контейнеризация"
        },
        {
            id: 1,
            name: "Хранилище"
        }],
    },
    {
        software: {
            id: 3,
            name: 'kubernetes',
            description: 'Kubernetes оркестрация',
            version: 'v1.33.7',
            logo: null,
        },
        tags: [{
            id: 0,
            name: "Контейнеризация"
        }],
    },
    {
        software: {
            id: 4,
            name: 'VSphere',
            description: 'VMware управление виртуальными машинами',
            version: 'v2.0',
            logo: null,
        },
        tags: [{
            id: 2,
            name: "Виртуализация"
        }],
    },
    {
        software: {
            id: 5,
            name: 'kvm',
            description: 'KVM (Kernel-based Virtual Machine) решение виртуализации',
            version: '8.3.2',
            logo: null,
        },
        tags: [{
            id: 2,
            name: "Виртуализация"
        }],
    },
];

export default softwareArray;