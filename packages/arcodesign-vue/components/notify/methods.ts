import { AppContext, h, render } from 'vue';
import Notify from './Notify.vue';
import { NotifyOptions, NotifyProps, NotifyType } from './type';
import { ContextProvider, GlobalContextParams } from '../context-provider';

export function makeNotify(type: NotifyType, appContext?: AppContext) {
    return (options: string | NotifyOptions, context?: GlobalContextParams) => {
        const div = document.createElement('div');
        const config: NotifyProps =
            typeof options === 'string'
                ? {
                      type: 'info',
                  }
                : {
                      ...options,
                      type,
                  };
        const vm = h(
            Notify,
            {
                ...config,
                modelValue: true,
                'onUpdate:modelValue': value => {
                    if (vm.component) {
                        vm.component.props.modelValue = value;
                    }
                },
                onClose: destroy,
            },
            typeof options === 'string' ? options : options.content,
        );

        const vmWithContext = h(ContextProvider, context, vm);
        if (appContext) {
            vmWithContext.appContext = appContext;
        }
        render(vmWithContext, div);

        const container =
            typeof options !== 'string' && options.getContainer
                ? options.getContainer()
                : document.body;
        container.appendChild(div);

        function destroy() {
            const onClose = typeof options === 'string' ? null : options.onClose;
            onClose && onClose();
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }

        function close() {
            if (vm.component) {
                vm.component.props.modelValue = false;
            }
        }

        function update(newOptions: NotifyProps) {
            Object.entries(newOptions).forEach(([key, value]) => {
                if (vm.component) {
                    vm.component.props[key] = value;
                }
            });
        }

        return {
            close,
            update,
        };
    };
}
