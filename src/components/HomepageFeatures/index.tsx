import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    image: string;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: '基于 go-zero 构建',
        image: require('@site/static/img/go-zero.png').default,
        description: (
            <>
                采用 go-zero 架构体系，天然支持微服务拆分，开发体验极佳，性能强劲。
            </>
        ),
    },
    {
        title: '完整兼容 Ruoyi-Plus',
        image: require('@site/static/img/ruoyi-plus.png').default,
        description: (
            <>
                完全兼容若依前端生态（Vue3 + Vben5），无缝对接，可作为 go-zero 的若依服务端脚手架。
            </>
        ),
    },
    {
        title: '内建多租户支持',
        image: require('@site/static/img/tenant.png').default,
        description: (
            <>
                内置多租户架构设计，支持租户隔离、独立鉴权，适用于多客户 SaaS 系统。
            </>
        ),
    },
];

function Feature({title, image, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img className={styles.featureImg} src={image} alt={title}/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
