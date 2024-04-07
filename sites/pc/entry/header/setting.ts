import Fuse from 'fuse';
import qaResource from '../../pages/guide/qa.json';
import qaEnResource from '../../pages/guide/qa-en.json';
import searchResource from '../../pages/resource/search.json';

interface IFuseMatches {
    matches: Array<{
        indices: Array<Array<number>>;
        key: string;
        value: string;
    }>;
}

interface IFuseResult<T> extends IFuseMatches {
    item: T;
    refIndex: number; // json文件中的位置下标
}

export type TQaFuseResult = Array<
    IFuseResult<{
        question: string;
        answer: string;
    }>
>;

export type TResourceFuseResult = Array<
    IFuseResult<{
        category: string;
        filename: string;
        functionName: string;
        description: string;
    }>
>;

export const resourceFuse = new Fuse(searchResource, {
    threshold: 0.6,
    includeMatches: true,
    keys: ['functionName', 'description'],
});

const qaOptions = {
    threshold: 0.3,
    includeMatches: true,
    keys: ['question', 'answer'],
};
export const qaFuse = new Fuse(qaResource, qaOptions);

export const qaEnFuse = new Fuse(qaEnResource, qaOptions);
