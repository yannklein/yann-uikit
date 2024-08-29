
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const data = { 
      sections: [
        {
          title: "Browser killer",
          description: "Utils to kill the annoying browser default style",
          code: {
            CSS: `body {
    background-color: rgb(250,250,250);
    color: rgb(40,40,40);
  }
    body, h1, h2, h3, p {
    margin: 0;
  }
  ul {s
    padding: 0;
  }
  a {
    text-decoration: none;
    display: inline-block;
  }`,
          },
        },
        {
          title: "Responsive container",
          description: "Content container simple and responsive (used on that page)",
          code: {
            HTML: `<div class="content-container"></div>`,
            CSS: `.content-container {
    width: 80vw;
    margin: 0 auto;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media (max-width: 992px) {
    .content-container {
      width: 700px;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media (max-width: 768px) {
    .content-container {
      width: 600px;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media (max-width: 576px) {
    .content-container {
      width: 300px;
    }
  }`,
          },
        },
        {
          title: "Page Frame",
          description: "Page frame with a fix header/footer and a scrollable body",
          link: {url: "header-body-footer.html", name: "example"},
          code: {
            HTML: `<div class="page-frame-content">
    <div class="page-frame-header">
    </div>
    <div class="page-frame-body">
    </div>
    <div class="page-frame-footer">
    </div>
  </div>`,
            CSS: `.page-frame-content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .page-frame-header {
    background-color: lightblue;
    padding: 16px;
  }

  .page-frame-body {
    flex-grow: 1;
    overflow: scroll;
  }

  .page-frame-footer {
    background-color: lightblue;
    padding: 16px;
  }`,
          },
        },
        {
          title: "Cards",
        },
        { title: "Items" },
        { title: "Buttons" },
        {
          title: "Navbar",
        },{
          title: "Others",
        },
      ],
      cards: {
        hello: {
          HTML: `<div class="card-hello">
    <img src="image.jpg" alt="">
    <div class="card-hello-info">
      <h2>The Hello Card</h2>
      <p>Some nice and subtle description</p>
    </div>
  </div>`,
          CSS: `/*Card Hello*/
  .card-hello {
    /*fixed*/
    display: flex;
    flex-direction: column;
    /*customizable*/
    height: 300px;
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }

  .card-hello img {
    /*fixed*/
    width: 100%;
    object-fit: cover;
    /*customizable*/
    object-position: 50% 50%;
    border-radius: 16px 16px 0 0;
    height: 30%;
    transition: height 1s ease;
  }

  .card-hello-info {
    /*fixed*/
    overflow: hidden;
    /*customizable*/
    padding: 16px;
  }

  .card-hello-info h2 {
    /*customizable*/
    margin: 16px 0;
  }

  /* De-activate card hover style for tablet/mobiles */
  @media (min-width: 1100px) {
    .card-hello img:hover {
      /*customizable*/
      height: 70%;
    }
  }

  .card-hello img.tapped {
    /*customizable*/
    height: 70%;
  }`,
          JS: `document.querySelector(".card-hello img")
    .addEventListener("click", (event) => {
      event.currentTarget.classList.toggle("tapped");
    });`,
        },
        pick: {
          HTML: `<div class="card-pick">
    <img src="image.jpg" alt="">
    <div class="card-pick-info">
      <h2>The Pick card</h2>
      <p>It goes up when you hover over it.</p>
    </div>
  </div>`,
          CSS: `/*Card pick*/
  .card-pick {
    /*fixed*/
    display: flex;
    flex-direction: column;
    /*customizable*/
    height: 300px;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
  }
  .card-pick img {
    /*fixed*/
    width: 100%;
    min-height: 100px;
    flex-grow: 1;
    object-fit: cover;
    /*customizable*/
    object-position: 50% 50%;
    border-radius: 4px 4px 0 0;
  }
  .card-pick-info {
    /*customizable*/
    padding: 24px 16px;
  }
  .card-pick-info h2 {
    /*customizable*/
    margin: 0;
  }
  .card-pick:hover {
    /*customizable*/
    transition: 0.2s ease-out;
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }`,
        },
        skills: {
          HTML: `<div class="card-skills">
    <div class="card-skills-img" style="background-image: url(background.jpg)">
      <h2>The skills card</h2>
    </div>
    <div class="card-skills-info">
      <div class="card-skills-info-content">
        <p>A card with a collapsable list of skills.</p>
        <ul>
          <li>🧠 an Einstein-level brain</li>
          <li>🐘 the memory of an elephant</li>
          <li>💪 Norrissian muscles</li>
          <li>🎸 a rock-star creativity</li>
          <li>🍷 romantic enough to shame a Frenchman</li>
          <li>👾 geeker than a 4chan teenager</li>
        </ul>
      </div>
      <div class="card-skills-info-more" on:click={toggleShow}>
      <i class="fa fa-chevron-down" aria-hidden="true"></i> More
      </div>
    </div>
  </div>`,
          CSS: `/*Card skills*/
  .card-skills {
    /*fixed*/
    display: flex;
    flex-direction: column;
    /*customizable*/
    width: 100%;
    max-width: 500px;
    height: 300px;
    position: relative;
  }
  .card-skills-img {
    /*fixed*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100px;
    background-size: cover;
    /*customizable*/
    background-position: 50% 50%;
    border-radius: 4px 4px 0 0;
    box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
  }
  .card-skills-img h2 {
    /*customizable*/
    color: white;
    margin: 0;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  .card-skills-info {
    /*fixed*/
    display: flex;
    flex-direction: column;
    z-index: 2;
    /*customizable*/
    height: 200px;
    width: 100%;
    border-radius: 0 0 4px 4px;
    background-color: white;
    position: absolute;
    top: 100px;
    box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
    transition: height 0.3s ease-out;
  }
  .card-skills-info-content {
    /*fixed*/
    overflow: hidden;
    flex-grow: 1;
    /*customizable*/
    padding: 0 32px;
  }
  .card-skills-info ul {
    /*customizable*/
    list-style: none;
  }
  .card-skills-info-more {
    /*fixed*/
    width: 100%;
    /*customizable*/
    padding: 8px 0;
    background-color: rgb(240, 240, 240);
    cursor: pointer;
    text-align: center;
    border-radius: 0 0 4px 4px;
  }
  .card-skills-info.show {
    /*fixed*/
    height: 100%;
  }`,
          JS: `document.querySelector(".card-skills-info-more")
    .addEventListener("click" , (event) => {
      document.querySelector(".card-skills-info").classList.toggle("show");
      event.currentTarget.querySelector("i").classList.toggle("fa-chevron-down");
      event.currentTarget.querySelector("i").classList.toggle("fa-chevron-up");
  })
  `,
        },
        identity: {
          HTML: `<div class="card-identity" style="background-image: url(background.jpg)">
  <div class="card-identity-content">
    <div class="card-identity-avatar">
        <img src="avatar.jpg" alt="avatar" class="card-identity-img">
        <h2>The ID card</h2>
    </div>
    <p>A card convenient to depict someone's identity.</p>
  </div>
  </div>`,
          CSS: `.card-identity {
    /*fixed*/
    display: flex;
    align-items: center;
    /*customizable*/
    height: 300px;
    border-radius: 16px;
    background-size: cover;
    background-position: 50% 50%;
    width: 100%;
    max-width: 500px;
  }
  .card-identity-content {
    /*customizable*/
    padding: 24px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(250, 250, 250, 0.5);
  }
  .card-identity-avatar {
    /*fixed*/
    display: flex;
    align-items: center;
  }
  .card-identity-avatar img {
    /*fixed*/
    object-fit: cover;
    border-radius: 50%;
    /*customizable*/
    width: 64px;
    height: 64px;
    object-position: 50% 50%;
    margin-right: 16px;
  }
  .card-identity-avatar h2 {
    /*fixed*/
    margin: 0;
  }
  .card-identity-content {
    /*fixed*/
    width: 100%;
  }
  .card-identity-content p {
    /*fixed*/
    margin: 0;
    margin-top: 16px;
  }`,
        },
        diapo: {
          HTML: `<div class="card-diapo" on:click={toggleCard}>
    <div class="card-diapo-img show" style="background-image: url(image1.jpg)">
      <div class="card-diapo-text">
        <h2>The Bad</h2>
        <p>The diapo card</p>
      </div>
    </div>
    <div class="card-diapo-img" style="background-image: url(image2.jpg)">
      <div class="card-diapo-text">
        <h2>The Good</h2>
        <p>The diapo card</p>
      </div>
    </div>
    <div class="card-diapo-img" style="background-image: url(image3.jpg)">
      <div class="card-diapo-text">
        <h2>The Ugly</h2>
        <p>The diapo card</p>
      </div>
    </div>
  </div>`,
          CSS: `/*Card diapo*/
  .card-diapo {
    /*fixed*/
    position: relative;
    /*customizable*/
    height: 300px;
    width: 100%;
    max-width: 500px;
  }
  .card-diapo-img {
    /*fixed*/
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    opacity: 0;
    /*customizable*/
    border-radius: 16px;
    transition: opacity 3s ease-out;
  }
  .card-diapo-img.show {
    /*fixed*/
    opacity: 1;
  }
  .card-diapo-text {
    /*fixed*/
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*customizable*/
    color: rgb(240, 240, 240);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  .card-diapo-text h2 {
    /*fixed*/
    margin: 0;
    /*customizable*/
    font-size: 32px;
  }
  .card-diapo-text p {
    /*fixed*/
    margin: 0;
  }`,
          JS: `let imgIndex = 1;
  const cardDiapoImgs = document.querySelectorAll(".card-diapo-img");
  setInterval(() => {
    cardDiapoImgs.forEach(cardDiapoImg => {
      cardDiapoImg.classList.remove("show");
    });
    cardDiapoImgs[imgIndex].classList.add("show");
    imgIndex = (imgIndex + 1) % cardDiapoImgs.length;
  }, 5000);`,
        },
        neumorph: {
          HTML: `<div class="card-neumorph">
  <div class="card-neumorph-buttons">
    <p>⚭</p>
    <p>Y</p>
    <p>⌬</p>
  </div>
  <h2>The <a href="https://neumorphism.io">Neumorphism</a> card</h2>
  </div>`,
          CSS: `.card-neumorph {
    /*customizable*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 300px;
    width: 100%;
    max-width: 500px;
    border-radius: 24px;
    background: -webkit-linear-gradient(55deg, #8aa0db, #a4beff);
    background: -o-linear-gradient(55deg, #8aa0db, #a4beff);
    background: linear-gradient(145deg, #8aa0db, #a4beff);
    box-shadow: 10px 10px 30px #8297cf,
        -10px -10px 30px #b0cdff;
    width: 100%;
  }
  .card-neumorph-buttons {
    /*customizable*/
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }
  .card-neumorph h2 {
    /*customizable*/
    font-size: 32px;
    margin: 0;
    text-align: center;
    color: #8aa0db;
    text-shadow: 2px 2px 4px #a4beff;
  }
  .card-neumorph-buttons p {
    /*customizable*/
    display: flex;
    font-size: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 64px;
    width: 64px;
    margin: 0;
    cursor: pointer;
    color: #6a80bb;
    text-shadow: 2px 2px 6px #a4beff;
    background: -webkit-linear-gradient(55deg, #8aa0db, #a4beff);
    background: -o-linear-gradient(55deg, #8aa0db, #a4beff);
    background: linear-gradient(145deg, #8aa0db, #a4beff);
    box-shadow: 10px 10px 30px #8297cf,
        -10px -10px 30px #b0cdff;
  }
  .card-neumorph-buttons p:active {
    /*fixed*/
    box-shadow: none;
  }
  .card-neumorph a {
    /*customizable*/g
    color: #6a80bb;
    text-shadow: 2px 2px 6px #a4beff;
  }`,
        },
        stack: {
          HTML: `<div class="card-stack">
  <a href="https://en.wikipedia.org/wiki/Alps" class="card-stack-item" style="background-image: url(image1.jpg)">
    <h2>Third item</h2>
    <p>A third item card that looks great</p>
  </a>
  <a href="https://en.wikipedia.org/wiki/Antelope_Canyon" class="card-stack-item" style="background-image: url(url(image2.jpg)">
    <h2>Second item</h2>
    <p>A second item card that looks great</p>
  </a>
  <a href="https://en.wikipedia.org/wiki/Canal_du_Midi" class="card-stack-item" style="background-image: url(url(image3.jpg)">
    <h2>First item</h2>
    <p>A first item card that looks great. ( to be used for Desktop view)</p>
  </a>
  </div>`,
          CSS: `.card-stack {
    /*fixed*/
    z-index: 1;
    position: relative;
    perspective: 400px;
    /*customizable*/
    height: 300px;
    width: 100%;
  }
  .card-stack-item {
    /*fixed*/
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    /*customizable*/
    color: white;
    text-shadow: 0 0 8px rgba(0,0,0,0.3);
    box-shadow: 16px 0 16px -7px rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform .3s;
  }

  .card-stack-item:nth-child(1) {
    /*customizable*/
    transform: translateZ(-64px) translateX(-8px) rotateY(-36deg);
  }
  .card-stack-item:nth-child(2) {
    /*customizable*/
    transform: translateZ(-64px) translateX(-32px) rotateY(-36deg);
  }
  .card-stack-item:nth-child(3) {
    /*customizable*/
    transform: translateZ(-64px) translateX(-56px) rotateY(-36deg);
  }

  .card-stack-item:not(:last-child):hover {
    /*customizable*/
    transform: translateZ(-64px) rotateY(-10deg) translateX(200px);
  }

  .card-stack-item h2 {
    /*fixed*/
    margin: 0;
    /*customizable*/
    font-size: 32px;
  }

  .card-stack-item p {
    /*customizable*/
    margin: 0 32px;
  }`,
        },
        vinyl: {
          HTML: `<div class="card-vinyl">
    <img
    alt="anteloupe canyon"
    class="card-vinyl-item"
    src="https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    />
    <img
    alt="alps"
    class="card-vinyl-item"
    src="https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    />
    <div
      class="card-vinyl-item"
      style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
    >
      <h2>Vinyl Card</h2>
      <p>
        Largely inspired by <a id="babin" href="https://github.com/nibab-boo">Babin Bohara</a> previous work.
      </p>
    </div>
  </div>`,
          CSS: `#babin {
    background-color: black;
    padding: 3px 6px;
    color: white;
    border-radius: 4px;
  }

  .card-vinyl {
    /*fixed*/
    position: relative;
    perspective: 400px;
    /*customizable*/
    height: 300px;
    width: 100%;
  }
  .card-vinyl-item {
    /*fixed*/
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    /*customizable*/
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: 0.3s;
  }

  .card-vinyl:hover .card-vinyl-item {
    box-shadow: 16px 0 16px -7px rgba(0,0,0,0.7);
  }

  .card-vinyl:hover .card-vinyl-item:nth-child(1) {
    /*customizable*/
    transform: rotateY(-20deg) translateX(-24px) scaleY(1.1);
  }

  .card-vinyl:hover .card-vinyl-item:nth-child(2) {
    /*customizable*/
    transform: rotateY(-20deg) translateX(-56px) scaleY(1.05);
  }

  .card-vinyl:hover .card-vinyl-item:nth-child(3) {
    /*customizable*/
    transform: rotateY(-20deg) translateX(-88px);
  }

  .card-vinyl-item h2 {
    /*fixed*/
    margin: 0;
    /*customizable*/
    font-size: 32px;
  }

  .card-vinyl-item p {
    /*customizable*/
    margin: 0 32px;
  }`,
        },
        simple: {
          HTML: `<div class="card-simple">
  <img
    alt="anteloupe canyon"
    class="card-simple-image"
    src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  />
  <div class="card-simple-tags">
    <span class="tag-green">Travel</span><span class="tag-orange"
      >Landscape</span
    >
  </div>

  <div class="card-simple-text">
    <img
      src="https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4"
      class="card-simple-avatar"
      alt="avatar"
    />
    <div class="price-tag">¥200</div>
    <div>
      <h2>Simple Card</h2>
      <p>A slightly simple but nice and efficient that does the job 💪</p>
    </div>
    <a class="card-simple-button" href="https://yannklein.dev/">A button</a>
  </div>
</div>`,
          CSS: `.card-simple {
    /*fixed*/
    position: relative;
    /*customizable*/
    width: 100%;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
  }

  .card-simple h2 {
    margin-bottom: 8px;
  }

  .card-simple-tags {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .card-simple-tags .tag-green {
    background: #21c68f;
    border: 2px solid #407765;
    border-radius: 50px;
    padding: 1px 8px;
    font-size: 12px;
    color: #1d342c;
  }

  .card-simple-tags .tag-orange {
    background: #e4b774;
    border: 2px solid #d6912a;
    border-radius: 50px;
    padding: 1px 8px;
    font-size: 12px;
    color: #582d0d;
  }

  .card-simple-text {
    /*fixed*/
    position: relative;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }


  .card-simple-avatar {
    /*fixed*/
    position: absolute;
    top: -32px;
    right: 16px;
    border-radius: 50%;
    height: 64px;
    width: 64px;
    object-fit: cover;
  }

  .card-simple-text .price-tag {
    width: fit-content;
    background: #bebebe;
    border-radius: 50px;
    padding: 4px 8px;
    font-size: 16px;
    font-weight: bold;
    color: #1d342c;
  }

  .card-simple-image {
    height: 260px;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }

  .card-simple-button {
    border-radius: 50px;
    padding: 8px 16px;
    background-color: salmon;
    color: white;
    transition: 0.1s;
    text-align: center;
    width: fit-content;
  }
  .card-simple-button:hover {
    background-color: rgb(250, 92, 75);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }`,
        },
      },
      items: {
        drawer: {
          HTML: `<div class="item-drawer">
  <div class="item-drawer-content">
    <h2>The drawer item</h2>
  </div>
  <div class="item-drawer-button">
    <i class="fas fa-ellipsis-v"></i>
  </div>
  <div class="item-drawer-settings">
    <a href="#"><i class="fas fa-edit"></i></a>
    <a href="#"><i class="fas fa-trash"></i></a>
  </div>
  </div>`,
          CSS: `.item-drawer {
    /*fixed*/
    display: flex;
    align-items: center;
    /*customizable*/
    height: 120px;
    width: 700px;
    max-width: 100%;
  /*   width: fit-content; */
    border-radius: 16px;
    box-shadow: 0 0 16px rgba(0,0,0,0.3);
    background-color: rgb(250,250,250);
  }

  .item-drawer h2 {
    /*customizable*/
    margin: 0;
  }

  .item-drawer-content {
    /*fixed*/
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    /*customizable*/
    padding: 0 32px;
  }

  .item-drawer-settings {
    /*fixed*/
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    white-space: nowrap;
    width: 0px;
    height: 100%;
    /*customizable*/
    transition: 0.3s ease-out;
    background-color: rgb(230,230,230);
    border-radius: 0 16px 16px 0;
    font-size: 40px;
  }

  .item-drawer-button {
    /*fixed*/
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    /*customizable*/
    background-color: #a4beff;
    border-radius: 0 16px 16px 0;
    width: 40px;
    font-size: 40px;
  }

  .item-drawer-settings a {
    /*customizable*/
    color: rgb(40,40,40);
  }

  .item-drawer.active .item-drawer-settings {
    /*customizable*/
    width: 180px;
  }

  .item-drawer.active .item-drawer-button {
    /*fixed*/
    border-radius: 0;
  }`,
          JS: `document.querySelector(".item-drawer-button")
    .addEventListener("click", (event) => {
      document.querySelector(".item-drawer").classList.toggle("active");
    });`,
        },
        "3d": {
          HTML: `<div class="item-3d">
  <div class="item-3d-content">
    <h2>The 3D item</h2>
    <p>An icon that pops up out of the card.</p>
  </div>
  <div class="item-3d-icon">
    <img src="images/youtube.png" alt="">
  </div>
  </div>`,
          CSS: `.item-3d {
    /*fixed*/
    display: flex;
    align-items: center;
    /*customizable*/
    width: 700px;
    max-width: 100%;
    height: 120px;
    border-radius: 16px;
    box-shadow: 0 0 16px rgba(0,0,0,0.3);
  }

  .item-3d h2 {
    /*customizable*/
    margin: 0;
  }

  .item-3d p {
    /*customizable*/
    margin: 0;
  }

  .item-3d-content {
    /*fixed*/
    flex-grow: 1;
    /*customizable*/
    background-color: rgb(250,250,250);
    padding-left: 32px;
  }

  .item-3d-icon {
    /*fixed*/
    position: relative;
    /*customizable*/
    width: 200px;
  }

  .item-3d-icon img {
    /*fixed*/
    position: absolute;
    top: 50%;
    left: 50%;
    /*customizable*/
    transform: translate(-50%, -60%);
    height: 150px;
    width: 150px;
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .item-3d-icon img {
      transform: translate(-30%, -50%);
      height: 120px;
      width: 120px;
    }
  }`,
        },
        flip: {
          HTML: `<div class="item-flip" on:click={toggleFlip} class:flipped={isFlipped}>
  <div class="item-flip-inner">
    <div class="item-flip-front">
      <div class="item-flip-content">
        <h2>The flipping item</h2>
        <p>Hover it (or click it on mobile) to display...</p>
      </div>
    </div>
    <div class="item-flip-back">
      <div class="item-flip-content">
        <p>The back of the card!</p>
      </div>
    </div>
  </div>
  </div>`,
          CSS: `.item-flip {
    /*customizable*/
    height: 120px;
    width: 700px;
    max-width: 100%;
  }

  .item-flip-inner {
    /*fixed*/
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .item-flip h2 {
    /*customizable*/
    margin: 0;
  }

  .item-flip p {
    /*customizable*/
    margin: 0;
  }

  .item-flip-front, .item-flip-back {
    /*fixed*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    /*customizable*/
    border-radius: 16px;
    box-shadow: 0 0 16px rgba(0,0,0,0.3);
    background-color: rgb(250,250,250);
  }

  .item-flip-content {
    padding-left: 24px;
  }

  .item-flip-back {
    transform: rotateX(180deg);
  }

  .item-flip.flipped .item-flip-inner {
    transform: rotateX(180deg);
  }

  /* De-activate card hover style for mobiles */
  @media (min-width: 1100px) {
    .item-flip:hover .item-flip-inner {
    transform: rotateX(180deg);
  }
  }`,
          JS: `document.querySelector(".item-flip")
    .addEventListener("click", (event) => {
      event.currentTarget.classList.toggle("flipped");
    });`,
        },
      },
      buttons: {
        push: {
          HTML: `
<div class="button-push">
  <a href="https://yannklein.dev/">PUSH</a>
</div>`,
          CSS: `
  .button-push {
    transform: translate(-4px, -4px);
    transition: 0.3s;
  }
  .button-push:hover {
    transform: translate(0px, 0px);
  }
  .button-push:active {
    transform: translate(4px, 4px);
  }
  .button-push a {
    background-color: #ca6a43;
    color: #7ebdc2;
    font-size: 24px;
    padding: 8px 24px;
    border-radius: 8px;
    border: 4px solid #7ebdc2;
    position: relative;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  }
  .button-push a:after {
    content: '';
    z-index: -1;
    background-color: #7ebdc2;
    border-radius: 8px;
    border: 4px solid #ca6a43;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }
  .button-push:hover a:after {
    top: 4px;
    left: 4px;
  }
  .button-push:active a:after {
    top: 0px;
    left: 0px;
  }`,
        },
        beforeAfter: {
          HTML: `
<div class="button-before-after" data-before="I'm before 👹" data-after="I'm after 😈">
  I'm the hidden content
</div>`,
          CSS: `
  .button-before-after {
    margin: 16px;
    width: 160px;
    height: 60px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    font-size: 24px;
  }

  .button-before-after:after {
    color: rgb(1, 113, 206);
    background-color: pink;
    content: attr(data-after);
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height 0.3s;
    overflow: hidden;
  }

  .button-before-after:before {
    background-color: rgb(1, 113, 206);
    content: attr(data-before);
    color: pink;
    position: absolute;
    width: 100%;
    height: 0%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height 0.3s;
    overflow: hidden;
  }

  .button-before-after:hover:before {
    height: 100%;
  }

  .button-before-after:hover:after {
    height: 0%;
  }`,
        },
      },
      navbars: {
        vanilla: {
          HTML: `<div class="navbar-vanilla">
    <a class="navbar-vanilla-section" href="#">
      <img class="navbar-vanilla-logo" src="logo.png" alt="logo">
      <h2 class="navbar-vanilla-brand" >Vanilla CSS navbar</h2>
    </a>
    <div class="navbar-vanilla-section">
      <div class="navbar-vanilla-menu">
        <a href="#">CSS tricks</a>
        <a href="#">Design gems</a>
      </div>
      <div class="navbar-vanilla-profile">
        <img src="https://avatars2.githubusercontent.com/u/26819547" alt="">
        <ul>
          <li><a href="#">Profile</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    </div>
  </div>`,
          CSS: `.navbar-vanilla {
    display: flex;
    height: 96px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
  }

  .navbar-vanilla a {
    text-decoration: none;
    color: rgb(40,40,40);
    font-size: 20px;
  }

  .navbar-vanilla-section {
    display: flex;
    align-items: center;
  }

  .navbar-vanilla-logo {
    height: 64px;
    width: 64;
    object-fit: cover;
    object-position: 50% 50%;
    margin: 0 24px;
  }

  .navbar-vanilla-brand {
    margin: 0;
  }

  .navbar-vanilla-menu a {
    margin: 0 16px;
  }

  .navbar-vanilla-profile {
    position: relative;
    margin: 0 24px;
  }

  .navbar-vanilla-profile img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
  }

  .navbar-vanilla-profile ul {
    position: absolute;
    top: 64px;
    right: 0;
    list-style: none;
    padding: 0;
    margin: 8px 0;
    background-color: white;
    padding: 16px;
    width: max-content;
    box-shadow: 0 0 16px rgba(0,0,0,0.1);
    text-align: right;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }

  .navbar-vanilla-profile li {
    margin: 8px;
  }

  .navbar-vanilla-profile.active ul {
    opacity: 1;
    visibility: visible;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media (max-width: 576px) {
    .navbar-vanilla-brand {
      font-size: 24px;
    }

    .navbar-vanilla-menu {
      display: none;
    }
  }`,
          JS: `document.querySelector(".navbar-vanilla-profile img")
  .addEventListener("click", (event) => {
    document.querySelector(".navbar-vanilla-profile").classList.toggle("active");
  })`,
        },
      },
      others: {
        sliderRange: {
          HTML: `
<div class="others-slider-range">
  <input class="slider" type="range" value="70" min="0" max="100" id="range" oninput="rangenumber.value=value"/>
  <input class="rangenumber" type="number" id="rangenumber" min="0" max="100" value="70" oninput="range.value=value">
</div>`,
          CSS: `.others-slider-range {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
  }
  .others-slider-range .slider {
    accent-color: rgb(2, 92, 165);
    flex-grow: 1;
  }
  .others-slider-range .rangenumber {
    border: 2px solid rgb(2, 92, 165);
    border-radius: 4px;
    text-align: center;
    background-color: pink;
    color: rgb(2, 92, 165);
  }`
        }
      } 
    };

    const sections = writable(data.sections);
    const cards = writable(data.cards);
    const items = writable(data.items);
    const buttons = writable(data.buttons);
    const navbars = writable(data.navbars);
    const others = writable(data.others);

    /* node_modules/fa-svelte/src/Icon.svelte generated by Svelte v3.59.2 */

    const file$s = "node_modules/fa-svelte/src/Icon.svelte";

    function create_fragment$s(ctx) {
    	let svg;
    	let path_1;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path_1 = svg_element("path");
    			attr_dev(path_1, "fill", "currentColor");
    			attr_dev(path_1, "d", /*path*/ ctx[0]);
    			add_location(path_1, file$s, 7, 2, 129);
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*classes*/ ctx[1]) + " svelte-1d15yci"));
    			attr_dev(svg, "role", "img");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[2]);
    			add_location(svg, file$s, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path_1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*path*/ 1) {
    				attr_dev(path_1, "d", /*path*/ ctx[0]);
    			}

    			if (dirty & /*classes*/ 2 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*classes*/ ctx[1]) + " svelte-1d15yci"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*viewBox*/ 4) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, []);
    	let { icon } = $$props;
    	let path = [];
    	let classes = "";
    	let viewBox = "";

    	$$self.$$.on_mount.push(function () {
    		if (icon === undefined && !('icon' in $$props || $$self.$$.bound[$$self.$$.props['icon']])) {
    			console.warn("<Icon> was created without expected prop 'icon'");
    		}
    	});

    	$$self.$$set = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('icon' in $$new_props) $$invalidate(3, icon = $$new_props.icon);
    	};

    	$$self.$capture_state = () => ({ icon, path, classes, viewBox });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    		if ('icon' in $$props) $$invalidate(3, icon = $$new_props.icon);
    		if ('path' in $$props) $$invalidate(0, path = $$new_props.path);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ('viewBox' in $$props) $$invalidate(2, viewBox = $$new_props.viewBox);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 8) {
    			$$invalidate(2, viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1]);
    		}

    		$$invalidate(1, classes = "fa-svelte " + ($$props.class ? $$props.class : ""));

    		if ($$self.$$.dirty & /*icon*/ 8) {
    			$$invalidate(0, path = icon.icon[4]);
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [path, classes, viewBox, icon];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { icon: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get icon() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var faHamburger = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'hamburger';
    var width = 512;
    var height = 512;
    var ligatures = [];
    var unicode = 'f805';
    var svgPathData = 'M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faHamburger = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    /* src/SideBar.svelte generated by Svelte v3.59.2 */
    const file$r = "src/SideBar.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (17:2) {#each sections as section}
    function create_each_block$6(ctx) {
    	let a;
    	let t0;
    	let t1_value = /*section*/ ctx[4] + "";
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text("❐ ");
    			t1 = text(t1_value);
    			attr_dev(a, "href", a_href_value = /*hrefify*/ ctx[3](/*section*/ ctx[4]));
    			attr_dev(a, "class", "svelte-1rzi1h0");
    			add_location(a, file$r, 17, 4, 472);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sections*/ 1 && t1_value !== (t1_value = /*section*/ ctx[4] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*sections*/ 1 && a_href_value !== (a_href_value = /*hrefify*/ ctx[3](/*section*/ ctx[4]))) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(17:2) {#each sections as section}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let div0;
    	let icon;
    	let t;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new Icon({
    			props: { icon: faHamburger.faHamburger },
    			$$inline: true
    		});

    	let each_value = /*sections*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(icon.$$.fragment);
    			t = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "sidebar-burger svelte-1rzi1h0");
    			add_location(div0, file$r, 12, 0, 307);
    			attr_dev(div1, "class", "sidebar svelte-1rzi1h0");
    			toggle_class(div1, "show", /*isShown*/ ctx[1]);
    			add_location(div1, file$r, 15, 0, 395);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(icon, div0, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*toggleMenu*/ ctx[2], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hrefify, sections*/ 9) {
    				each_value = /*sections*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*isShown*/ 2) {
    				toggle_class(div1, "show", /*isShown*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(icon);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SideBar', slots, []);
    	let { sections } = $$props;
    	let isShown = false;
    	const toggleMenu = () => $$invalidate(1, isShown = !isShown);
    	const hrefify = title => `#${title.toLowerCase().replace(" ", "-")}-section`;

    	$$self.$$.on_mount.push(function () {
    		if (sections === undefined && !('sections' in $$props || $$self.$$.bound[$$self.$$.props['sections']])) {
    			console.warn("<SideBar> was created without expected prop 'sections'");
    		}
    	});

    	const writable_props = ['sections'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SideBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('sections' in $$props) $$invalidate(0, sections = $$props.sections);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		faHamburger: faHamburger.faHamburger,
    		sections,
    		isShown,
    		toggleMenu,
    		hrefify
    	});

    	$$self.$inject_state = $$props => {
    		if ('sections' in $$props) $$invalidate(0, sections = $$props.sections);
    		if ('isShown' in $$props) $$invalidate(1, isShown = $$props.isShown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [sections, isShown, toggleMenu, hrefify];
    }

    class SideBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { sections: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SideBar",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get sections() {
    		throw new Error("<SideBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sections(value) {
    		throw new Error("<SideBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Hero.svelte generated by Svelte v3.59.2 */

    const file$q = "src/Hero.svelte";

    function create_fragment$q(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t0;
    	let t1;
    	let p;
    	let t2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p = element("p");
    			t2 = text(/*description*/ ctx[1]);
    			add_location(h1, file$q, 7, 4, 111);
    			attr_dev(p, "class", "svelte-12mlbe8");
    			add_location(p, file$q, 8, 4, 132);
    			attr_dev(div0, "class", "content-container svelte-12mlbe8");
    			add_location(div0, file$q, 6, 2, 75);
    			attr_dev(div1, "class", "hero svelte-12mlbe8");
    			add_location(div1, file$q, 5, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*description*/ 2) set_data_dev(t2, /*description*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);
    	let { title, description } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Hero> was created without expected prop 'title'");
    		}

    		if (description === undefined && !('description' in $$props || $$self.$$.bound[$$self.$$.props['description']])) {
    			console.warn("<Hero> was created without expected prop 'description'");
    		}
    	});

    	const writable_props = ['title', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({ title, description });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { title: 0, description: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get title() {
    		throw new Error("<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var prism = createCommonjsModule(function (module) {
    /* **********************************************
         Begin prism-core.js
    ********************************************** */

    /// <reference lib="WebWorker"/>

    var _self = (typeof window !== 'undefined')
    	? window   // if in browser
    	: (
    		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
    			? self // if in worker
    			: {}   // if in node js
    	);

    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     *
     * @license MIT <https://opensource.org/licenses/MIT>
     * @author Lea Verou <https://lea.verou.me>
     * @namespace
     * @public
     */
    var Prism = (function (_self) {

    	// Private helper vars
    	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    	var uniqueId = 0;

    	// The grammar object for plaintext
    	var plainTextGrammar = {};


    	var _ = {
    		/**
    		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
    		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
    		 * additional languages or plugins yourself.
    		 *
    		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
    		 *
    		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
    		 * empty Prism object into the global scope before loading the Prism script like this:
    		 *
    		 * ```js
    		 * window.Prism = window.Prism || {};
    		 * Prism.manual = true;
    		 * // add a new <script> to load Prism's script
    		 * ```
    		 *
    		 * @default false
    		 * @type {boolean}
    		 * @memberof Prism
    		 * @public
    		 */
    		manual: _self.Prism && _self.Prism.manual,
    		/**
    		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
    		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
    		 * own worker, you don't want it to do this.
    		 *
    		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
    		 *
    		 * You obviously have to change this value before Prism executes. To do this, you can add an
    		 * empty Prism object into the global scope before loading the Prism script like this:
    		 *
    		 * ```js
    		 * window.Prism = window.Prism || {};
    		 * Prism.disableWorkerMessageHandler = true;
    		 * // Load Prism's script
    		 * ```
    		 *
    		 * @default false
    		 * @type {boolean}
    		 * @memberof Prism
    		 * @public
    		 */
    		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

    		/**
    		 * A namespace for utility methods.
    		 *
    		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
    		 * change or disappear at any time.
    		 *
    		 * @namespace
    		 * @memberof Prism
    		 */
    		util: {
    			encode: function encode(tokens) {
    				if (tokens instanceof Token) {
    					return new Token(tokens.type, encode(tokens.content), tokens.alias);
    				} else if (Array.isArray(tokens)) {
    					return tokens.map(encode);
    				} else {
    					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
    				}
    			},

    			/**
    			 * Returns the name of the type of the given value.
    			 *
    			 * @param {any} o
    			 * @returns {string}
    			 * @example
    			 * type(null)      === 'Null'
    			 * type(undefined) === 'Undefined'
    			 * type(123)       === 'Number'
    			 * type('foo')     === 'String'
    			 * type(true)      === 'Boolean'
    			 * type([1, 2])    === 'Array'
    			 * type({})        === 'Object'
    			 * type(String)    === 'Function'
    			 * type(/abc+/)    === 'RegExp'
    			 */
    			type: function (o) {
    				return Object.prototype.toString.call(o).slice(8, -1);
    			},

    			/**
    			 * Returns a unique number for the given object. Later calls will still return the same number.
    			 *
    			 * @param {Object} obj
    			 * @returns {number}
    			 */
    			objId: function (obj) {
    				if (!obj['__id']) {
    					Object.defineProperty(obj, '__id', { value: ++uniqueId });
    				}
    				return obj['__id'];
    			},

    			/**
    			 * Creates a deep clone of the given object.
    			 *
    			 * The main intended use of this function is to clone language definitions.
    			 *
    			 * @param {T} o
    			 * @param {Record<number, any>} [visited]
    			 * @returns {T}
    			 * @template T
    			 */
    			clone: function deepClone(o, visited) {
    				visited = visited || {};

    				var clone; var id;
    				switch (_.util.type(o)) {
    					case 'Object':
    						id = _.util.objId(o);
    						if (visited[id]) {
    							return visited[id];
    						}
    						clone = /** @type {Record<string, any>} */ ({});
    						visited[id] = clone;

    						for (var key in o) {
    							if (o.hasOwnProperty(key)) {
    								clone[key] = deepClone(o[key], visited);
    							}
    						}

    						return /** @type {any} */ (clone);

    					case 'Array':
    						id = _.util.objId(o);
    						if (visited[id]) {
    							return visited[id];
    						}
    						clone = [];
    						visited[id] = clone;

    						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
    							clone[i] = deepClone(v, visited);
    						});

    						return /** @type {any} */ (clone);

    					default:
    						return o;
    				}
    			},

    			/**
    			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
    			 *
    			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
    			 *
    			 * @param {Element} element
    			 * @returns {string}
    			 */
    			getLanguage: function (element) {
    				while (element) {
    					var m = lang.exec(element.className);
    					if (m) {
    						return m[1].toLowerCase();
    					}
    					element = element.parentElement;
    				}
    				return 'none';
    			},

    			/**
    			 * Sets the Prism `language-xxxx` class of the given element.
    			 *
    			 * @param {Element} element
    			 * @param {string} language
    			 * @returns {void}
    			 */
    			setLanguage: function (element, language) {
    				// remove all `language-xxxx` classes
    				// (this might leave behind a leading space)
    				element.className = element.className.replace(RegExp(lang, 'gi'), '');

    				// add the new `language-xxxx` class
    				// (using `classList` will automatically clean up spaces for us)
    				element.classList.add('language-' + language);
    			},

    			/**
    			 * Returns the script element that is currently executing.
    			 *
    			 * This does __not__ work for line script element.
    			 *
    			 * @returns {HTMLScriptElement | null}
    			 */
    			currentScript: function () {
    				if (typeof document === 'undefined') {
    					return null;
    				}
    				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
    					return /** @type {any} */ (document.currentScript);
    				}

    				// IE11 workaround
    				// we'll get the src of the current script by parsing IE11's error stack trace
    				// this will not work for inline scripts

    				try {
    					throw new Error();
    				} catch (err) {
    					// Get file src url from stack. Specifically works with the format of stack traces in IE.
    					// A stack will look like this:
    					//
    					// Error
    					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
    					//    at Global code (http://localhost/components/prism-core.js:606:1)

    					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
    					if (src) {
    						var scripts = document.getElementsByTagName('script');
    						for (var i in scripts) {
    							if (scripts[i].src == src) {
    								return scripts[i];
    							}
    						}
    					}
    					return null;
    				}
    			},

    			/**
    			 * Returns whether a given class is active for `element`.
    			 *
    			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
    			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
    			 * given class is just the given class with a `no-` prefix.
    			 *
    			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
    			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
    			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
    			 *
    			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
    			 * version of it, the class is considered active.
    			 *
    			 * @param {Element} element
    			 * @param {string} className
    			 * @param {boolean} [defaultActivation=false]
    			 * @returns {boolean}
    			 */
    			isActive: function (element, className, defaultActivation) {
    				var no = 'no-' + className;

    				while (element) {
    					var classList = element.classList;
    					if (classList.contains(className)) {
    						return true;
    					}
    					if (classList.contains(no)) {
    						return false;
    					}
    					element = element.parentElement;
    				}
    				return !!defaultActivation;
    			}
    		},

    		/**
    		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
    		 *
    		 * @namespace
    		 * @memberof Prism
    		 * @public
    		 */
    		languages: {
    			/**
    			 * The grammar for plain, unformatted text.
    			 */
    			plain: plainTextGrammar,
    			plaintext: plainTextGrammar,
    			text: plainTextGrammar,
    			txt: plainTextGrammar,

    			/**
    			 * Creates a deep copy of the language with the given id and appends the given tokens.
    			 *
    			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
    			 * will be overwritten at its original position.
    			 *
    			 * ## Best practices
    			 *
    			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
    			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
    			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
    			 *
    			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
    			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
    			 *
    			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
    			 * @param {Grammar} redef The new tokens to append.
    			 * @returns {Grammar} The new language created.
    			 * @public
    			 * @example
    			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
    			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
    			 *     // at its original position
    			 *     'comment': { ... },
    			 *     // CSS doesn't have a 'color' token, so this token will be appended
    			 *     'color': /\b(?:red|green|blue)\b/
    			 * });
    			 */
    			extend: function (id, redef) {
    				var lang = _.util.clone(_.languages[id]);

    				for (var key in redef) {
    					lang[key] = redef[key];
    				}

    				return lang;
    			},

    			/**
    			 * Inserts tokens _before_ another token in a language definition or any other grammar.
    			 *
    			 * ## Usage
    			 *
    			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
    			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
    			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
    			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
    			 * this:
    			 *
    			 * ```js
    			 * Prism.languages.markup.style = {
    			 *     // token
    			 * };
    			 * ```
    			 *
    			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
    			 * before existing tokens. For the CSS example above, you would use it like this:
    			 *
    			 * ```js
    			 * Prism.languages.insertBefore('markup', 'cdata', {
    			 *     'style': {
    			 *         // token
    			 *     }
    			 * });
    			 * ```
    			 *
    			 * ## Special cases
    			 *
    			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
    			 * will be ignored.
    			 *
    			 * This behavior can be used to insert tokens after `before`:
    			 *
    			 * ```js
    			 * Prism.languages.insertBefore('markup', 'comment', {
    			 *     'comment': Prism.languages.markup.comment,
    			 *     // tokens after 'comment'
    			 * });
    			 * ```
    			 *
    			 * ## Limitations
    			 *
    			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
    			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
    			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
    			 * deleting properties which is necessary to insert at arbitrary positions.
    			 *
    			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
    			 * Instead, it will create a new object and replace all references to the target object with the new one. This
    			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
    			 *
    			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
    			 * you hold the target object in a variable, then the value of the variable will not change.
    			 *
    			 * ```js
    			 * var oldMarkup = Prism.languages.markup;
    			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
    			 *
    			 * assert(oldMarkup !== Prism.languages.markup);
    			 * assert(newMarkup === Prism.languages.markup);
    			 * ```
    			 *
    			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
    			 * object to be modified.
    			 * @param {string} before The key to insert before.
    			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
    			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
    			 * object to be modified.
    			 *
    			 * Defaults to `Prism.languages`.
    			 * @returns {Grammar} The new grammar object.
    			 * @public
    			 */
    			insertBefore: function (inside, before, insert, root) {
    				root = root || /** @type {any} */ (_.languages);
    				var grammar = root[inside];
    				/** @type {Grammar} */
    				var ret = {};

    				for (var token in grammar) {
    					if (grammar.hasOwnProperty(token)) {

    						if (token == before) {
    							for (var newToken in insert) {
    								if (insert.hasOwnProperty(newToken)) {
    									ret[newToken] = insert[newToken];
    								}
    							}
    						}

    						// Do not insert token which also occur in insert. See #1525
    						if (!insert.hasOwnProperty(token)) {
    							ret[token] = grammar[token];
    						}
    					}
    				}

    				var old = root[inside];
    				root[inside] = ret;

    				// Update references in other language definitions
    				_.languages.DFS(_.languages, function (key, value) {
    					if (value === old && key != inside) {
    						this[key] = ret;
    					}
    				});

    				return ret;
    			},

    			// Traverse a language definition with Depth First Search
    			DFS: function DFS(o, callback, type, visited) {
    				visited = visited || {};

    				var objId = _.util.objId;

    				for (var i in o) {
    					if (o.hasOwnProperty(i)) {
    						callback.call(o, i, o[i], type || i);

    						var property = o[i];
    						var propertyType = _.util.type(property);

    						if (propertyType === 'Object' && !visited[objId(property)]) {
    							visited[objId(property)] = true;
    							DFS(property, callback, null, visited);
    						} else if (propertyType === 'Array' && !visited[objId(property)]) {
    							visited[objId(property)] = true;
    							DFS(property, callback, i, visited);
    						}
    					}
    				}
    			}
    		},

    		plugins: {},

    		/**
    		 * This is the most high-level function in Prism’s API.
    		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
    		 * each one of them.
    		 *
    		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
    		 *
    		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
    		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
    		 * @memberof Prism
    		 * @public
    		 */
    		highlightAll: function (async, callback) {
    			_.highlightAllUnder(document, async, callback);
    		},

    		/**
    		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
    		 * {@link Prism.highlightElement} on each one of them.
    		 *
    		 * The following hooks will be run:
    		 * 1. `before-highlightall`
    		 * 2. `before-all-elements-highlight`
    		 * 3. All hooks of {@link Prism.highlightElement} for each element.
    		 *
    		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
    		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
    		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
    		 * @memberof Prism
    		 * @public
    		 */
    		highlightAllUnder: function (container, async, callback) {
    			var env = {
    				callback: callback,
    				container: container,
    				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
    			};

    			_.hooks.run('before-highlightall', env);

    			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

    			_.hooks.run('before-all-elements-highlight', env);

    			for (var i = 0, element; (element = env.elements[i++]);) {
    				_.highlightElement(element, async === true, env.callback);
    			}
    		},

    		/**
    		 * Highlights the code inside a single element.
    		 *
    		 * The following hooks will be run:
    		 * 1. `before-sanity-check`
    		 * 2. `before-highlight`
    		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
    		 * 4. `before-insert`
    		 * 5. `after-highlight`
    		 * 6. `complete`
    		 *
    		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
    		 * the element's language.
    		 *
    		 * @param {Element} element The element containing the code.
    		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
    		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
    		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
    		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
    		 *
    		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
    		 * asynchronous highlighting to work. You can build your own bundle on the
    		 * [Download page](https://prismjs.com/download.html).
    		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
    		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
    		 * @memberof Prism
    		 * @public
    		 */
    		highlightElement: function (element, async, callback) {
    			// Find language
    			var language = _.util.getLanguage(element);
    			var grammar = _.languages[language];

    			// Set language on the element, if not present
    			_.util.setLanguage(element, language);

    			// Set language on the parent, for styling
    			var parent = element.parentElement;
    			if (parent && parent.nodeName.toLowerCase() === 'pre') {
    				_.util.setLanguage(parent, language);
    			}

    			var code = element.textContent;

    			var env = {
    				element: element,
    				language: language,
    				grammar: grammar,
    				code: code
    			};

    			function insertHighlightedCode(highlightedCode) {
    				env.highlightedCode = highlightedCode;

    				_.hooks.run('before-insert', env);

    				env.element.innerHTML = env.highlightedCode;

    				_.hooks.run('after-highlight', env);
    				_.hooks.run('complete', env);
    				callback && callback.call(env.element);
    			}

    			_.hooks.run('before-sanity-check', env);

    			// plugins may change/add the parent/element
    			parent = env.element.parentElement;
    			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
    				parent.setAttribute('tabindex', '0');
    			}

    			if (!env.code) {
    				_.hooks.run('complete', env);
    				callback && callback.call(env.element);
    				return;
    			}

    			_.hooks.run('before-highlight', env);

    			if (!env.grammar) {
    				insertHighlightedCode(_.util.encode(env.code));
    				return;
    			}

    			if (async && _self.Worker) {
    				var worker = new Worker(_.filename);

    				worker.onmessage = function (evt) {
    					insertHighlightedCode(evt.data);
    				};

    				worker.postMessage(JSON.stringify({
    					language: env.language,
    					code: env.code,
    					immediateClose: true
    				}));
    			} else {
    				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
    			}
    		},

    		/**
    		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
    		 * and the language definitions to use, and returns a string with the HTML produced.
    		 *
    		 * The following hooks will be run:
    		 * 1. `before-tokenize`
    		 * 2. `after-tokenize`
    		 * 3. `wrap`: On each {@link Token}.
    		 *
    		 * @param {string} text A string with the code to be highlighted.
    		 * @param {Grammar} grammar An object containing the tokens to use.
    		 *
    		 * Usually a language definition like `Prism.languages.markup`.
    		 * @param {string} language The name of the language definition passed to `grammar`.
    		 * @returns {string} The highlighted HTML.
    		 * @memberof Prism
    		 * @public
    		 * @example
    		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
    		 */
    		highlight: function (text, grammar, language) {
    			var env = {
    				code: text,
    				grammar: grammar,
    				language: language
    			};
    			_.hooks.run('before-tokenize', env);
    			if (!env.grammar) {
    				throw new Error('The language "' + env.language + '" has no grammar.');
    			}
    			env.tokens = _.tokenize(env.code, env.grammar);
    			_.hooks.run('after-tokenize', env);
    			return Token.stringify(_.util.encode(env.tokens), env.language);
    		},

    		/**
    		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
    		 * and the language definitions to use, and returns an array with the tokenized code.
    		 *
    		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
    		 *
    		 * This method could be useful in other contexts as well, as a very crude parser.
    		 *
    		 * @param {string} text A string with the code to be highlighted.
    		 * @param {Grammar} grammar An object containing the tokens to use.
    		 *
    		 * Usually a language definition like `Prism.languages.markup`.
    		 * @returns {TokenStream} An array of strings and tokens, a token stream.
    		 * @memberof Prism
    		 * @public
    		 * @example
    		 * let code = `var foo = 0;`;
    		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
    		 * tokens.forEach(token => {
    		 *     if (token instanceof Prism.Token && token.type === 'number') {
    		 *         console.log(`Found numeric literal: ${token.content}`);
    		 *     }
    		 * });
    		 */
    		tokenize: function (text, grammar) {
    			var rest = grammar.rest;
    			if (rest) {
    				for (var token in rest) {
    					grammar[token] = rest[token];
    				}

    				delete grammar.rest;
    			}

    			var tokenList = new LinkedList();
    			addAfter(tokenList, tokenList.head, text);

    			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

    			return toArray(tokenList);
    		},

    		/**
    		 * @namespace
    		 * @memberof Prism
    		 * @public
    		 */
    		hooks: {
    			all: {},

    			/**
    			 * Adds the given callback to the list of callbacks for the given hook.
    			 *
    			 * The callback will be invoked when the hook it is registered for is run.
    			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
    			 *
    			 * One callback function can be registered to multiple hooks and the same hook multiple times.
    			 *
    			 * @param {string} name The name of the hook.
    			 * @param {HookCallback} callback The callback function which is given environment variables.
    			 * @public
    			 */
    			add: function (name, callback) {
    				var hooks = _.hooks.all;

    				hooks[name] = hooks[name] || [];

    				hooks[name].push(callback);
    			},

    			/**
    			 * Runs a hook invoking all registered callbacks with the given environment variables.
    			 *
    			 * Callbacks will be invoked synchronously and in the order in which they were registered.
    			 *
    			 * @param {string} name The name of the hook.
    			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
    			 * @public
    			 */
    			run: function (name, env) {
    				var callbacks = _.hooks.all[name];

    				if (!callbacks || !callbacks.length) {
    					return;
    				}

    				for (var i = 0, callback; (callback = callbacks[i++]);) {
    					callback(env);
    				}
    			}
    		},

    		Token: Token
    	};
    	_self.Prism = _;


    	// Typescript note:
    	// The following can be used to import the Token type in JSDoc:
    	//
    	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

    	/**
    	 * Creates a new token.
    	 *
    	 * @param {string} type See {@link Token#type type}
    	 * @param {string | TokenStream} content See {@link Token#content content}
    	 * @param {string|string[]} [alias] The alias(es) of the token.
    	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
    	 * @class
    	 * @global
    	 * @public
    	 */
    	function Token(type, content, alias, matchedStr) {
    		/**
    		 * The type of the token.
    		 *
    		 * This is usually the key of a pattern in a {@link Grammar}.
    		 *
    		 * @type {string}
    		 * @see GrammarToken
    		 * @public
    		 */
    		this.type = type;
    		/**
    		 * The strings or tokens contained by this token.
    		 *
    		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
    		 *
    		 * @type {string | TokenStream}
    		 * @public
    		 */
    		this.content = content;
    		/**
    		 * The alias(es) of the token.
    		 *
    		 * @type {string|string[]}
    		 * @see GrammarToken
    		 * @public
    		 */
    		this.alias = alias;
    		// Copy of the full string this token was created from
    		this.length = (matchedStr || '').length | 0;
    	}

    	/**
    	 * A token stream is an array of strings and {@link Token Token} objects.
    	 *
    	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
    	 * them.
    	 *
    	 * 1. No adjacent strings.
    	 * 2. No empty strings.
    	 *
    	 *    The only exception here is the token stream that only contains the empty string and nothing else.
    	 *
    	 * @typedef {Array<string | Token>} TokenStream
    	 * @global
    	 * @public
    	 */

    	/**
    	 * Converts the given token or token stream to an HTML representation.
    	 *
    	 * The following hooks will be run:
    	 * 1. `wrap`: On each {@link Token}.
    	 *
    	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
    	 * @param {string} language The name of current language.
    	 * @returns {string} The HTML representation of the token or token stream.
    	 * @memberof Token
    	 * @static
    	 */
    	Token.stringify = function stringify(o, language) {
    		if (typeof o == 'string') {
    			return o;
    		}
    		if (Array.isArray(o)) {
    			var s = '';
    			o.forEach(function (e) {
    				s += stringify(e, language);
    			});
    			return s;
    		}

    		var env = {
    			type: o.type,
    			content: stringify(o.content, language),
    			tag: 'span',
    			classes: ['token', o.type],
    			attributes: {},
    			language: language
    		};

    		var aliases = o.alias;
    		if (aliases) {
    			if (Array.isArray(aliases)) {
    				Array.prototype.push.apply(env.classes, aliases);
    			} else {
    				env.classes.push(aliases);
    			}
    		}

    		_.hooks.run('wrap', env);

    		var attributes = '';
    		for (var name in env.attributes) {
    			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    		}

    		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
    	};

    	/**
    	 * @param {RegExp} pattern
    	 * @param {number} pos
    	 * @param {string} text
    	 * @param {boolean} lookbehind
    	 * @returns {RegExpExecArray | null}
    	 */
    	function matchPattern(pattern, pos, text, lookbehind) {
    		pattern.lastIndex = pos;
    		var match = pattern.exec(text);
    		if (match && lookbehind && match[1]) {
    			// change the match to remove the text matched by the Prism lookbehind group
    			var lookbehindLength = match[1].length;
    			match.index += lookbehindLength;
    			match[0] = match[0].slice(lookbehindLength);
    		}
    		return match;
    	}

    	/**
    	 * @param {string} text
    	 * @param {LinkedList<string | Token>} tokenList
    	 * @param {any} grammar
    	 * @param {LinkedListNode<string | Token>} startNode
    	 * @param {number} startPos
    	 * @param {RematchOptions} [rematch]
    	 * @returns {void}
    	 * @private
    	 *
    	 * @typedef RematchOptions
    	 * @property {string} cause
    	 * @property {number} reach
    	 */
    	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    		for (var token in grammar) {
    			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
    				continue;
    			}

    			var patterns = grammar[token];
    			patterns = Array.isArray(patterns) ? patterns : [patterns];

    			for (var j = 0; j < patterns.length; ++j) {
    				if (rematch && rematch.cause == token + ',' + j) {
    					return;
    				}

    				var patternObj = patterns[j];
    				var inside = patternObj.inside;
    				var lookbehind = !!patternObj.lookbehind;
    				var greedy = !!patternObj.greedy;
    				var alias = patternObj.alias;

    				if (greedy && !patternObj.pattern.global) {
    					// Without the global flag, lastIndex won't work
    					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
    					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
    				}

    				/** @type {RegExp} */
    				var pattern = patternObj.pattern || patternObj;

    				for ( // iterate the token list and keep track of the current token/string position
    					var currentNode = startNode.next, pos = startPos;
    					currentNode !== tokenList.tail;
    					pos += currentNode.value.length, currentNode = currentNode.next
    				) {

    					if (rematch && pos >= rematch.reach) {
    						break;
    					}

    					var str = currentNode.value;

    					if (tokenList.length > text.length) {
    						// Something went terribly wrong, ABORT, ABORT!
    						return;
    					}

    					if (str instanceof Token) {
    						continue;
    					}

    					var removeCount = 1; // this is the to parameter of removeBetween
    					var match;

    					if (greedy) {
    						match = matchPattern(pattern, pos, text, lookbehind);
    						if (!match || match.index >= text.length) {
    							break;
    						}

    						var from = match.index;
    						var to = match.index + match[0].length;
    						var p = pos;

    						// find the node that contains the match
    						p += currentNode.value.length;
    						while (from >= p) {
    							currentNode = currentNode.next;
    							p += currentNode.value.length;
    						}
    						// adjust pos (and p)
    						p -= currentNode.value.length;
    						pos = p;

    						// the current node is a Token, then the match starts inside another Token, which is invalid
    						if (currentNode.value instanceof Token) {
    							continue;
    						}

    						// find the last node which is affected by this match
    						for (
    							var k = currentNode;
    							k !== tokenList.tail && (p < to || typeof k.value === 'string');
    							k = k.next
    						) {
    							removeCount++;
    							p += k.value.length;
    						}
    						removeCount--;

    						// replace with the new match
    						str = text.slice(pos, p);
    						match.index -= pos;
    					} else {
    						match = matchPattern(pattern, 0, str, lookbehind);
    						if (!match) {
    							continue;
    						}
    					}

    					// eslint-disable-next-line no-redeclare
    					var from = match.index;
    					var matchStr = match[0];
    					var before = str.slice(0, from);
    					var after = str.slice(from + matchStr.length);

    					var reach = pos + str.length;
    					if (rematch && reach > rematch.reach) {
    						rematch.reach = reach;
    					}

    					var removeFrom = currentNode.prev;

    					if (before) {
    						removeFrom = addAfter(tokenList, removeFrom, before);
    						pos += before.length;
    					}

    					removeRange(tokenList, removeFrom, removeCount);

    					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
    					currentNode = addAfter(tokenList, removeFrom, wrapped);

    					if (after) {
    						addAfter(tokenList, currentNode, after);
    					}

    					if (removeCount > 1) {
    						// at least one Token object was removed, so we have to do some rematching
    						// this can only happen if the current pattern is greedy

    						/** @type {RematchOptions} */
    						var nestedRematch = {
    							cause: token + ',' + j,
    							reach: reach
    						};
    						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

    						// the reach might have been extended because of the rematching
    						if (rematch && nestedRematch.reach > rematch.reach) {
    							rematch.reach = nestedRematch.reach;
    						}
    					}
    				}
    			}
    		}
    	}

    	/**
    	 * @typedef LinkedListNode
    	 * @property {T} value
    	 * @property {LinkedListNode<T> | null} prev The previous node.
    	 * @property {LinkedListNode<T> | null} next The next node.
    	 * @template T
    	 * @private
    	 */

    	/**
    	 * @template T
    	 * @private
    	 */
    	function LinkedList() {
    		/** @type {LinkedListNode<T>} */
    		var head = { value: null, prev: null, next: null };
    		/** @type {LinkedListNode<T>} */
    		var tail = { value: null, prev: head, next: null };
    		head.next = tail;

    		/** @type {LinkedListNode<T>} */
    		this.head = head;
    		/** @type {LinkedListNode<T>} */
    		this.tail = tail;
    		this.length = 0;
    	}

    	/**
    	 * Adds a new node with the given value to the list.
    	 *
    	 * @param {LinkedList<T>} list
    	 * @param {LinkedListNode<T>} node
    	 * @param {T} value
    	 * @returns {LinkedListNode<T>} The added node.
    	 * @template T
    	 */
    	function addAfter(list, node, value) {
    		// assumes that node != list.tail && values.length >= 0
    		var next = node.next;

    		var newNode = { value: value, prev: node, next: next };
    		node.next = newNode;
    		next.prev = newNode;
    		list.length++;

    		return newNode;
    	}
    	/**
    	 * Removes `count` nodes after the given node. The given node will not be removed.
    	 *
    	 * @param {LinkedList<T>} list
    	 * @param {LinkedListNode<T>} node
    	 * @param {number} count
    	 * @template T
    	 */
    	function removeRange(list, node, count) {
    		var next = node.next;
    		for (var i = 0; i < count && next !== list.tail; i++) {
    			next = next.next;
    		}
    		node.next = next;
    		next.prev = node;
    		list.length -= i;
    	}
    	/**
    	 * @param {LinkedList<T>} list
    	 * @returns {T[]}
    	 * @template T
    	 */
    	function toArray(list) {
    		var array = [];
    		var node = list.head.next;
    		while (node !== list.tail) {
    			array.push(node.value);
    			node = node.next;
    		}
    		return array;
    	}


    	if (!_self.document) {
    		if (!_self.addEventListener) {
    			// in Node.js
    			return _;
    		}

    		if (!_.disableWorkerMessageHandler) {
    			// In worker
    			_self.addEventListener('message', function (evt) {
    				var message = JSON.parse(evt.data);
    				var lang = message.language;
    				var code = message.code;
    				var immediateClose = message.immediateClose;

    				_self.postMessage(_.highlight(code, _.languages[lang], lang));
    				if (immediateClose) {
    					_self.close();
    				}
    			}, false);
    		}

    		return _;
    	}

    	// Get current script and highlight
    	var script = _.util.currentScript();

    	if (script) {
    		_.filename = script.src;

    		if (script.hasAttribute('data-manual')) {
    			_.manual = true;
    		}
    	}

    	function highlightAutomaticallyCallback() {
    		if (!_.manual) {
    			_.highlightAll();
    		}
    	}

    	if (!_.manual) {
    		// If the document state is "loading", then we'll use DOMContentLoaded.
    		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
    		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
    		// might take longer one animation frame to execute which can create a race condition where only some plugins have
    		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
    		// See https://github.com/PrismJS/prism/issues/2102
    		var readyState = document.readyState;
    		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
    			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
    		} else {
    			if (window.requestAnimationFrame) {
    				window.requestAnimationFrame(highlightAutomaticallyCallback);
    			} else {
    				window.setTimeout(highlightAutomaticallyCallback, 16);
    			}
    		}
    	}

    	return _;

    }(_self));

    if (module.exports) {
    	module.exports = Prism;
    }

    // hack for components to work correctly in node.js
    if (typeof commonjsGlobal !== 'undefined') {
    	commonjsGlobal.Prism = Prism;
    }

    // some additional documentation/types

    /**
     * The expansion of a simple `RegExp` literal to support additional properties.
     *
     * @typedef GrammarToken
     * @property {RegExp} pattern The regular expression of the token.
     * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
     * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
     * @property {boolean} [greedy=false] Whether the token is greedy.
     * @property {string|string[]} [alias] An optional alias or list of aliases.
     * @property {Grammar} [inside] The nested grammar of this token.
     *
     * The `inside` grammar will be used to tokenize the text value of each token of this kind.
     *
     * This can be used to make nested and even recursive language definitions.
     *
     * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
     * each another.
     * @global
     * @public
     */

    /**
     * @typedef Grammar
     * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
     * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
     * @global
     * @public
     */

    /**
     * A function which will invoked after an element was successfully highlighted.
     *
     * @callback HighlightCallback
     * @param {Element} element The element successfully highlighted.
     * @returns {void}
     * @global
     * @public
     */

    /**
     * @callback HookCallback
     * @param {Object<string, any>} env The environment variables of the hook.
     * @returns {void}
     * @global
     * @public
     */


    /* **********************************************
         Begin prism-markup.js
    ********************************************** */

    Prism.languages.markup = {
    	'comment': {
    		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    		greedy: true
    	},
    	'prolog': {
    		pattern: /<\?[\s\S]+?\?>/,
    		greedy: true
    	},
    	'doctype': {
    		// https://www.w3.org/TR/xml/#NT-doctypedecl
    		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    		greedy: true,
    		inside: {
    			'internal-subset': {
    				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
    				lookbehind: true,
    				greedy: true,
    				inside: null // see below
    			},
    			'string': {
    				pattern: /"[^"]*"|'[^']*'/,
    				greedy: true
    			},
    			'punctuation': /^<!|>$|[[\]]/,
    			'doctype-tag': /^DOCTYPE/i,
    			'name': /[^\s<>'"]+/
    		}
    	},
    	'cdata': {
    		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    		greedy: true
    	},
    	'tag': {
    		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    		greedy: true,
    		inside: {
    			'tag': {
    				pattern: /^<\/?[^\s>\/]+/,
    				inside: {
    					'punctuation': /^<\/?/,
    					'namespace': /^[^\s>\/:]+:/
    				}
    			},
    			'special-attr': [],
    			'attr-value': {
    				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
    				inside: {
    					'punctuation': [
    						{
    							pattern: /^=/,
    							alias: 'attr-equals'
    						},
    						{
    							pattern: /^(\s*)["']|["']$/,
    							lookbehind: true
    						}
    					]
    				}
    			},
    			'punctuation': /\/?>/,
    			'attr-name': {
    				pattern: /[^\s>\/]+/,
    				inside: {
    					'namespace': /^[^\s>\/:]+:/
    				}
    			}

    		}
    	},
    	'entity': [
    		{
    			pattern: /&[\da-z]{1,8};/i,
    			alias: 'named-entity'
    		},
    		/&#x?[\da-f]{1,8};/i
    	]
    };

    Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
    	Prism.languages.markup['entity'];
    Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

    // Plugin to make entity title show the real entity, idea by Roman Komarov
    Prism.hooks.add('wrap', function (env) {

    	if (env.type === 'entity') {
    		env.attributes['title'] = env.content.replace(/&amp;/, '&');
    	}
    });

    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    	/**
    	 * Adds an inlined language to markup.
    	 *
    	 * An example of an inlined language is CSS with `<style>` tags.
    	 *
    	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
    	 * case insensitive.
    	 * @param {string} lang The language key.
    	 * @example
    	 * addInlined('style', 'css');
    	 */
    	value: function addInlined(tagName, lang) {
    		var includedCdataInside = {};
    		includedCdataInside['language-' + lang] = {
    			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
    			lookbehind: true,
    			inside: Prism.languages[lang]
    		};
    		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

    		var inside = {
    			'included-cdata': {
    				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    				inside: includedCdataInside
    			}
    		};
    		inside['language-' + lang] = {
    			pattern: /[\s\S]+/,
    			inside: Prism.languages[lang]
    		};

    		var def = {};
    		def[tagName] = {
    			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
    			lookbehind: true,
    			greedy: true,
    			inside: inside
    		};

    		Prism.languages.insertBefore('markup', 'cdata', def);
    	}
    });
    Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    	/**
    	 * Adds an pattern to highlight languages embedded in HTML attributes.
    	 *
    	 * An example of an inlined language is CSS with `style` attributes.
    	 *
    	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
    	 * case insensitive.
    	 * @param {string} lang The language key.
    	 * @example
    	 * addAttribute('style', 'css');
    	 */
    	value: function (attrName, lang) {
    		Prism.languages.markup.tag.inside['special-attr'].push({
    			pattern: RegExp(
    				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
    				'i'
    			),
    			lookbehind: true,
    			inside: {
    				'attr-name': /^[^\s=]+/,
    				'attr-value': {
    					pattern: /=[\s\S]+/,
    					inside: {
    						'value': {
    							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
    							lookbehind: true,
    							alias: [lang, 'language-' + lang],
    							inside: Prism.languages[lang]
    						},
    						'punctuation': [
    							{
    								pattern: /^=/,
    								alias: 'attr-equals'
    							},
    							/"|'/
    						]
    					}
    				}
    			}
    		});
    	}
    });

    Prism.languages.html = Prism.languages.markup;
    Prism.languages.mathml = Prism.languages.markup;
    Prism.languages.svg = Prism.languages.markup;

    Prism.languages.xml = Prism.languages.extend('markup', {});
    Prism.languages.ssml = Prism.languages.xml;
    Prism.languages.atom = Prism.languages.xml;
    Prism.languages.rss = Prism.languages.xml;


    /* **********************************************
         Begin prism-css.js
    ********************************************** */

    (function (Prism) {

    	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

    	Prism.languages.css = {
    		'comment': /\/\*[\s\S]*?\*\//,
    		'atrule': {
    			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
    			inside: {
    				'rule': /^@[\w-]+/,
    				'selector-function-argument': {
    					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
    					lookbehind: true,
    					alias: 'selector'
    				},
    				'keyword': {
    					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
    					lookbehind: true
    				}
    				// See rest below
    			}
    		},
    		'url': {
    			// https://drafts.csswg.org/css-values-3/#urls
    			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
    			greedy: true,
    			inside: {
    				'function': /^url/i,
    				'punctuation': /^\(|\)$/,
    				'string': {
    					pattern: RegExp('^' + string.source + '$'),
    					alias: 'url'
    				}
    			}
    		},
    		'selector': {
    			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
    			lookbehind: true
    		},
    		'string': {
    			pattern: string,
    			greedy: true
    		},
    		'property': {
    			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    			lookbehind: true
    		},
    		'important': /!important\b/i,
    		'function': {
    			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
    			lookbehind: true
    		},
    		'punctuation': /[(){};:,]/
    	};

    	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

    	var markup = Prism.languages.markup;
    	if (markup) {
    		markup.tag.addInlined('style', 'css');
    		markup.tag.addAttribute('style', 'css');
    	}

    }(Prism));


    /* **********************************************
         Begin prism-clike.js
    ********************************************** */

    Prism.languages.clike = {
    	'comment': [
    		{
    			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    			lookbehind: true,
    			greedy: true
    		},
    		{
    			pattern: /(^|[^\\:])\/\/.*/,
    			lookbehind: true,
    			greedy: true
    		}
    	],
    	'string': {
    		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    		greedy: true
    	},
    	'class-name': {
    		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    		lookbehind: true,
    		inside: {
    			'punctuation': /[.\\]/
    		}
    	},
    	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    	'boolean': /\b(?:false|true)\b/,
    	'function': /\b\w+(?=\()/,
    	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    	'punctuation': /[{}[\];(),.:]/
    };


    /* **********************************************
         Begin prism-javascript.js
    ********************************************** */

    Prism.languages.javascript = Prism.languages.extend('clike', {
    	'class-name': [
    		Prism.languages.clike['class-name'],
    		{
    			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    			lookbehind: true
    		}
    	],
    	'keyword': [
    		{
    			pattern: /((?:^|\})\s*)catch\b/,
    			lookbehind: true
    		},
    		{
    			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    			lookbehind: true
    		},
    	],
    	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    	'number': {
    		pattern: RegExp(
    			/(^|[^\w$])/.source +
    			'(?:' +
    			(
    				// constant
    				/NaN|Infinity/.source +
    				'|' +
    				// binary integer
    				/0[bB][01]+(?:_[01]+)*n?/.source +
    				'|' +
    				// octal integer
    				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
    				'|' +
    				// hexadecimal integer
    				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
    				'|' +
    				// decimal bigint
    				/\d+(?:_\d+)*n/.source +
    				'|' +
    				// decimal number (integer or float) but no bigint
    				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
    			) +
    			')' +
    			/(?![\w$])/.source
    		),
    		lookbehind: true
    	},
    	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });

    Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

    Prism.languages.insertBefore('javascript', 'keyword', {
    	'regex': {
    		pattern: RegExp(
    			// lookbehind
    			// eslint-disable-next-line regexp/no-dupe-characters-character-class
    			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
    			// Regex pattern:
    			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
    			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
    			// with the only syntax, so we have to define 2 different regex patterns.
    			/\//.source +
    			'(?:' +
    			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
    			'|' +
    			// `v` flag syntax. This supports 3 levels of nested character classes.
    			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
    			')' +
    			// lookahead
    			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    		),
    		lookbehind: true,
    		greedy: true,
    		inside: {
    			'regex-source': {
    				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
    				lookbehind: true,
    				alias: 'language-regex',
    				inside: Prism.languages.regex
    			},
    			'regex-delimiter': /^\/|\/$/,
    			'regex-flags': /^[a-z]+$/,
    		}
    	},
    	// This must be declared before keyword because we use "function" inside the look-forward
    	'function-variable': {
    		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    		alias: 'function'
    	},
    	'parameter': [
    		{
    			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    			lookbehind: true,
    			inside: Prism.languages.javascript
    		},
    		{
    			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    			lookbehind: true,
    			inside: Prism.languages.javascript
    		},
    		{
    			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    			lookbehind: true,
    			inside: Prism.languages.javascript
    		},
    		{
    			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    			lookbehind: true,
    			inside: Prism.languages.javascript
    		}
    	],
    	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });

    Prism.languages.insertBefore('javascript', 'string', {
    	'hashbang': {
    		pattern: /^#!.*/,
    		greedy: true,
    		alias: 'comment'
    	},
    	'template-string': {
    		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    		greedy: true,
    		inside: {
    			'template-punctuation': {
    				pattern: /^`|`$/,
    				alias: 'string'
    			},
    			'interpolation': {
    				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
    				lookbehind: true,
    				inside: {
    					'interpolation-punctuation': {
    						pattern: /^\$\{|\}$/,
    						alias: 'punctuation'
    					},
    					rest: Prism.languages.javascript
    				}
    			},
    			'string': /[\s\S]+/
    		}
    	},
    	'string-property': {
    		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    		lookbehind: true,
    		greedy: true,
    		alias: 'property'
    	}
    });

    Prism.languages.insertBefore('javascript', 'operator', {
    	'literal-property': {
    		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    		lookbehind: true,
    		alias: 'property'
    	},
    });

    if (Prism.languages.markup) {
    	Prism.languages.markup.tag.addInlined('script', 'javascript');

    	// add attribute support for all DOM events.
    	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
    	Prism.languages.markup.tag.addAttribute(
    		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    		'javascript'
    	);
    }

    Prism.languages.js = Prism.languages.javascript;


    /* **********************************************
         Begin prism-file-highlight.js
    ********************************************** */

    (function () {

    	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    		return;
    	}

    	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
    	if (!Element.prototype.matches) {
    		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    	}

    	var LOADING_MESSAGE = 'Loading…';
    	var FAILURE_MESSAGE = function (status, message) {
    		return '✖ Error ' + status + ' while fetching file: ' + message;
    	};
    	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

    	var EXTENSIONS = {
    		'js': 'javascript',
    		'py': 'python',
    		'rb': 'ruby',
    		'ps1': 'powershell',
    		'psm1': 'powershell',
    		'sh': 'bash',
    		'bat': 'batch',
    		'h': 'c',
    		'tex': 'latex'
    	};

    	var STATUS_ATTR = 'data-src-status';
    	var STATUS_LOADING = 'loading';
    	var STATUS_LOADED = 'loaded';
    	var STATUS_FAILED = 'failed';

    	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
    		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

    	/**
    	 * Loads the given file.
    	 *
    	 * @param {string} src The URL or path of the source file to load.
    	 * @param {(result: string) => void} success
    	 * @param {(reason: string) => void} error
    	 */
    	function loadFile(src, success, error) {
    		var xhr = new XMLHttpRequest();
    		xhr.open('GET', src, true);
    		xhr.onreadystatechange = function () {
    			if (xhr.readyState == 4) {
    				if (xhr.status < 400 && xhr.responseText) {
    					success(xhr.responseText);
    				} else {
    					if (xhr.status >= 400) {
    						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
    					} else {
    						error(FAILURE_EMPTY_MESSAGE);
    					}
    				}
    			}
    		};
    		xhr.send(null);
    	}

    	/**
    	 * Parses the given range.
    	 *
    	 * This returns a range with inclusive ends.
    	 *
    	 * @param {string | null | undefined} range
    	 * @returns {[number, number | undefined] | undefined}
    	 */
    	function parseRange(range) {
    		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
    		if (m) {
    			var start = Number(m[1]);
    			var comma = m[2];
    			var end = m[3];

    			if (!comma) {
    				return [start, start];
    			}
    			if (!end) {
    				return [start, undefined];
    			}
    			return [start, Number(end)];
    		}
    		return undefined;
    	}

    	Prism.hooks.add('before-highlightall', function (env) {
    		env.selector += ', ' + SELECTOR;
    	});

    	Prism.hooks.add('before-sanity-check', function (env) {
    		var pre = /** @type {HTMLPreElement} */ (env.element);
    		if (pre.matches(SELECTOR)) {
    			env.code = ''; // fast-path the whole thing and go to complete

    			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

    			// add code element with loading message
    			var code = pre.appendChild(document.createElement('CODE'));
    			code.textContent = LOADING_MESSAGE;

    			var src = pre.getAttribute('data-src');

    			var language = env.language;
    			if (language === 'none') {
    				// the language might be 'none' because there is no language set;
    				// in this case, we want to use the extension as the language
    				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
    				language = EXTENSIONS[extension] || extension;
    			}

    			// set language classes
    			Prism.util.setLanguage(code, language);
    			Prism.util.setLanguage(pre, language);

    			// preload the language
    			var autoloader = Prism.plugins.autoloader;
    			if (autoloader) {
    				autoloader.loadLanguages(language);
    			}

    			// load file
    			loadFile(
    				src,
    				function (text) {
    					// mark as loaded
    					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

    					// handle data-range
    					var range = parseRange(pre.getAttribute('data-range'));
    					if (range) {
    						var lines = text.split(/\r\n?|\n/g);

    						// the range is one-based and inclusive on both ends
    						var start = range[0];
    						var end = range[1] == null ? lines.length : range[1];

    						if (start < 0) { start += lines.length; }
    						start = Math.max(0, Math.min(start - 1, lines.length));
    						if (end < 0) { end += lines.length; }
    						end = Math.max(0, Math.min(end, lines.length));

    						text = lines.slice(start, end).join('\n');

    						// add data-start for line numbers
    						if (!pre.hasAttribute('data-start')) {
    							pre.setAttribute('data-start', String(start + 1));
    						}
    					}

    					// highlight code
    					code.textContent = text;
    					Prism.highlightElement(code);
    				},
    				function (error) {
    					// mark as failed
    					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

    					code.textContent = error;
    				}
    			);
    		}
    	});

    	Prism.plugins.fileHighlight = {
    		/**
    		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
    		 *
    		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
    		 *
    		 * @param {ParentNode} [container=document]
    		 */
    		highlight: function highlight(container) {
    			var elements = (container || document).querySelectorAll(SELECTOR);

    			for (var i = 0, element; (element = elements[i++]);) {
    				Prism.highlightElement(element);
    			}
    		}
    	};

    	var logged = false;
    	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
    	Prism.fileHighlight = function () {
    		if (!logged) {
    			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
    			logged = true;
    		}
    		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
    	};

    }());
    });

    /* src/sections/utils/Code.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1$4 } = globals;
    const file$p = "src/sections/utils/Code.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (24:2) {#each Object.keys(code) as lang}
    function create_each_block$5(ctx) {
    	let h3;
    	let t_value = /*lang*/ ctx[6] + "";
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(t_value);
    			attr_dev(h3, "class", "svelte-1wywk15");
    			add_location(h3, file$p, 24, 4, 602);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					h3,
    					"click",
    					function () {
    						if (is_function(/*currentLang*/ ctx[4].set(/*lang*/ ctx[6]))) /*currentLang*/ ctx[4].set(/*lang*/ ctx[6]).apply(this, arguments);
    					},
    					false,
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*code*/ 1 && t_value !== (t_value = /*lang*/ ctx[6] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(24:2) {#each Object.keys(code) as lang}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t2;
    	let div2;
    	let pre;
    	let code_1;
    	let t3;
    	let html_tag;
    	let raw_value = /*styledCode*/ ctx[1][/*$currentLang*/ ctx[3]] + "";
    	let t4;
    	let mounted;
    	let dispose;
    	let each_value = Object.keys(/*code*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Copied!";
    			t2 = space();
    			div2 = element("div");
    			pre = element("pre");
    			code_1 = element("code");
    			t3 = text("\n  ");
    			html_tag = new HtmlTag(false);
    			t4 = text("\n  ");
    			attr_dev(div0, "class", "copied svelte-1wywk15");
    			toggle_class(div0, "active", /*isCopied*/ ctx[2]);
    			add_location(div0, file$p, 26, 2, 663);
    			attr_dev(div1, "class", "tab svelte-1wywk15");
    			add_location(div1, file$p, 22, 0, 544);
    			html_tag.a = t4;
    			add_location(code_1, file$p, 29, 7, 774);
    			add_location(pre, file$p, 29, 2, 769);
    			attr_dev(div2, "class", "code svelte-1wywk15");
    			add_location(div2, file$p, 28, 0, 728);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, pre);
    			append_dev(pre, code_1);
    			append_dev(code_1, t3);
    			html_tag.m(raw_value, code_1);
    			append_dev(code_1, t4);

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*copyCode*/ ctx[5], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currentLang, Object, code*/ 17) {
    				each_value = Object.keys(/*code*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*isCopied*/ 4) {
    				toggle_class(div0, "active", /*isCopied*/ ctx[2]);
    			}

    			if (dirty & /*styledCode, $currentLang*/ 10 && raw_value !== (raw_value = /*styledCode*/ ctx[1][/*$currentLang*/ ctx[3]] + "")) html_tag.p(raw_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let $currentLang;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Code', slots, []);
    	let { code } = $$props;
    	const styledCode = {};

    	Object.keys(code).forEach(lang => {
    		$$invalidate(1, styledCode[lang] = prism.highlight(code[lang], prism.languages[lang.toLowerCase()], lang.toLowerCase()), styledCode);
    	});

    	const currentLang = writable(Object.keys(code)[0]);
    	validate_store(currentLang, 'currentLang');
    	component_subscribe($$self, currentLang, value => $$invalidate(3, $currentLang = value));
    	let isCopied = false;

    	const copyCode = () => {
    		$$invalidate(2, isCopied = true);
    		navigator.clipboard.writeText(code[$currentLang]);

    		setTimeout(
    			() => {
    				$$invalidate(2, isCopied = false);
    			},
    			1000
    		);
    	};

    	$$self.$$.on_mount.push(function () {
    		if (code === undefined && !('code' in $$props || $$self.$$.bound[$$self.$$.props['code']])) {
    			console.warn("<Code> was created without expected prop 'code'");
    		}
    	});

    	const writable_props = ['code'];

    	Object_1$4.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('code' in $$props) $$invalidate(0, code = $$props.code);
    	};

    	$$self.$capture_state = () => ({
    		Prism: prism,
    		writable,
    		code,
    		styledCode,
    		currentLang,
    		isCopied,
    		copyCode,
    		$currentLang
    	});

    	$$self.$inject_state = $$props => {
    		if ('code' in $$props) $$invalidate(0, code = $$props.code);
    		if ('isCopied' in $$props) $$invalidate(2, isCopied = $$props.isCopied);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [code, styledCode, isCopied, $currentLang, currentLang, copyCode];
    }

    class Code extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { code: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Code",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get code() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/SectionSimple.svelte generated by Svelte v3.59.2 */
    const file$o = "src/sections/SectionSimple.svelte";

    // (12:4) {#if link}
    function create_if_block$1(ctx) {
    	let t0;
    	let a;
    	let t1_value = /*link*/ ctx[3].name + "";
    	let t1;
    	let a_href_value;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("(");
    			a = element("a");
    			t1 = text(t1_value);
    			t2 = text(")");
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[3].url);
    			attr_dev(a, "class", "svelte-1lru5uv");
    			add_location(a, file$o, 12, 7, 338);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, a, anchor);
    			append_dev(a, t1);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*link*/ 8 && t1_value !== (t1_value = /*link*/ ctx[3].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*link*/ 8 && a_href_value !== (a_href_value = /*link*/ ctx[3].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(a);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(12:4) {#if link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div1;
    	let h2;
    	let t0;
    	let t1;
    	let t2;
    	let div0;
    	let span;
    	let t3;
    	let t4;
    	let t5;
    	let code_1;
    	let div1_id_value;
    	let current;
    	let if_block = /*link*/ ctx[3] && create_if_block$1(ctx);

    	code_1 = new Code({
    			props: { code: /*code*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			t0 = text("❐ ");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			div0 = element("div");
    			span = element("span");
    			t3 = text(/*description*/ ctx[1]);
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			create_component(code_1.$$.fragment);
    			attr_dev(h2, "class", "svelte-1lru5uv");
    			add_location(h2, file$o, 8, 2, 238);
    			add_location(span, file$o, 10, 4, 289);
    			attr_dev(div0, "class", "description svelte-1lru5uv");
    			add_location(div0, file$o, 9, 2, 259);
    			attr_dev(div1, "id", div1_id_value = /*idify*/ ctx[4](/*title*/ ctx[0]));
    			attr_dev(div1, "class", "page-section svelte-1lru5uv");
    			add_location(div1, file$o, 7, 0, 191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(span, t3);
    			append_dev(div0, t4);
    			if (if_block) if_block.m(div0, null);
    			append_dev(div1, t5);
    			mount_component(code_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);
    			if (!current || dirty & /*description*/ 2) set_data_dev(t3, /*description*/ ctx[1]);

    			if (/*link*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const code_1_changes = {};
    			if (dirty & /*code*/ 4) code_1_changes.code = /*code*/ ctx[2];
    			code_1.$set(code_1_changes);

    			if (!current || dirty & /*title*/ 1 && div1_id_value !== (div1_id_value = /*idify*/ ctx[4](/*title*/ ctx[0]))) {
    				attr_dev(div1, "id", div1_id_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(code_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(code_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			destroy_component(code_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionSimple', slots, []);
    	let { title, description, code, link = "" } = $$props;
    	const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<SectionSimple> was created without expected prop 'title'");
    		}

    		if (description === undefined && !('description' in $$props || $$self.$$.bound[$$self.$$.props['description']])) {
    			console.warn("<SectionSimple> was created without expected prop 'description'");
    		}

    		if (code === undefined && !('code' in $$props || $$self.$$.bound[$$self.$$.props['code']])) {
    			console.warn("<SectionSimple> was created without expected prop 'code'");
    		}
    	});

    	const writable_props = ['title', 'description', 'code', 'link'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionSimple> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('code' in $$props) $$invalidate(2, code = $$props.code);
    		if ('link' in $$props) $$invalidate(3, link = $$props.link);
    	};

    	$$self.$capture_state = () => ({
    		Code,
    		title,
    		description,
    		code,
    		link,
    		idify
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('code' in $$props) $$invalidate(2, code = $$props.code);
    		if ('link' in $$props) $$invalidate(3, link = $$props.link);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description, code, link, idify];
    }

    class SectionSimple extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {
    			title: 0,
    			description: 1,
    			code: 2,
    			link: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionSimple",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get title() {
    		throw new Error("<SectionSimple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SectionSimple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<SectionSimple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<SectionSimple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get code() {
    		throw new Error("<SectionSimple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error("<SectionSimple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<SectionSimple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<SectionSimple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    var faTimes = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'times';
    var width = 352;
    var height = 512;
    var ligatures = [];
    var unicode = 'f00d';
    var svgPathData = 'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faTimes = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    /* src/sections/utils/CodePopup.svelte generated by Svelte v3.59.2 */
    const file$n = "src/sections/utils/CodePopup.svelte";

    function create_fragment$n(ctx) {
    	let div1;
    	let div0;
    	let icon;
    	let t;
    	let code_1;
    	let div1_transition;
    	let current;
    	let mounted;
    	let dispose;
    	icon = new Icon({ props: { icon: faTimes.faTimes }, $$inline: true });

    	code_1 = new Code({
    			props: { code: /*code*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(icon.$$.fragment);
    			t = space();
    			create_component(code_1.$$.fragment);
    			attr_dev(div0, "id", "close");
    			attr_dev(div0, "class", "svelte-1onc964");
    			add_location(div0, file$n, 10, 2, 306);
    			attr_dev(div1, "class", "code-popup svelte-1onc964");
    			add_location(div1, file$n, 9, 0, 233);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			mount_component(icon, div0, null);
    			append_dev(div1, t);
    			mount_component(code_1, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*click_handler*/ ctx[2], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const code_1_changes = {};
    			if (dirty & /*code*/ 2) code_1_changes.code = /*code*/ ctx[1];
    			code_1.$set(code_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			transition_in(code_1.$$.fragment, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, { delay: 0, duration: 200 }, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			transition_out(code_1.$$.fragment, local);
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, { delay: 0, duration: 200 }, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(icon);
    			destroy_component(code_1);
    			if (detaching && div1_transition) div1_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CodePopup', slots, []);
    	let { showCode, code } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (showCode === undefined && !('showCode' in $$props || $$self.$$.bound[$$self.$$.props['showCode']])) {
    			console.warn("<CodePopup> was created without expected prop 'showCode'");
    		}

    		if (code === undefined && !('code' in $$props || $$self.$$.bound[$$self.$$.props['code']])) {
    			console.warn("<CodePopup> was created without expected prop 'code'");
    		}
    	});

    	const writable_props = ['showCode', 'code'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CodePopup> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => showCode(false);

    	$$self.$$set = $$props => {
    		if ('showCode' in $$props) $$invalidate(0, showCode = $$props.showCode);
    		if ('code' in $$props) $$invalidate(1, code = $$props.code);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Code,
    		Icon,
    		faTimes: faTimes.faTimes,
    		showCode,
    		code
    	});

    	$$self.$inject_state = $$props => {
    		if ('showCode' in $$props) $$invalidate(0, showCode = $$props.showCode);
    		if ('code' in $$props) $$invalidate(1, code = $$props.code);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showCode, code, click_handler];
    }

    class CodePopup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { showCode: 0, code: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CodePopup",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get showCode() {
    		throw new Error("<CodePopup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showCode(value) {
    		throw new Error("<CodePopup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get code() {
    		throw new Error("<CodePopup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error("<CodePopup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var faCode = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'code';
    var width = 640;
    var height = 512;
    var ligatures = [];
    var unicode = 'f121';
    var svgPathData = 'M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faCode = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    /* src/sections/utils/ComponentWrapper.svelte generated by Svelte v3.59.2 */
    const file$m = "src/sections/utils/ComponentWrapper.svelte";

    // (25:0) {#if $codeShown}
    function create_if_block(ctx) {
    	let cardcode;
    	let current;

    	cardcode = new CodePopup({
    			props: {
    				showCode: /*showCode*/ ctx[5],
    				code: /*data*/ ctx[3][/*type*/ ctx[0]][/*comp*/ ctx[1]]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cardcode.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(cardcode, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cardcode_changes = {};
    			if (dirty & /*type, comp*/ 3) cardcode_changes.code = /*data*/ ctx[3][/*type*/ ctx[0]][/*comp*/ ctx[1]];
    			cardcode.$set(cardcode_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardcode.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardcode.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cardcode, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(25:0) {#if $codeShown}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let div;
    	let h3;
    	let icon;
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	icon = new Icon({ props: { icon: faCode.faCode }, $$inline: true });
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let if_block = /*$codeShown*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			create_component(icon.$$.fragment);
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(h3, "class", "svelte-2pq8jo");
    			add_location(h3, file$m, 21, 2, 567);
    			attr_dev(div, "class", "card-container svelte-2pq8jo");
    			add_location(div, file$m, 20, 0, 536);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			mount_component(icon, h3, null);
    			append_dev(div, t0);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(h3, "click", /*click_handler*/ ctx[8], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*$codeShown*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$codeShown*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let $others;
    	let $navbars;
    	let $buttons;
    	let $items;
    	let $cards;
    	let $codeShown;
    	validate_store(others, 'others');
    	component_subscribe($$self, others, $$value => $$invalidate(9, $others = $$value));
    	validate_store(navbars, 'navbars');
    	component_subscribe($$self, navbars, $$value => $$invalidate(10, $navbars = $$value));
    	validate_store(buttons, 'buttons');
    	component_subscribe($$self, buttons, $$value => $$invalidate(11, $buttons = $$value));
    	validate_store(items, 'items');
    	component_subscribe($$self, items, $$value => $$invalidate(12, $items = $$value));
    	validate_store(cards, 'cards');
    	component_subscribe($$self, cards, $$value => $$invalidate(13, $cards = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ComponentWrapper', slots, ['default']);
    	let { type, comp } = $$props;

    	const data = {
    		cards: $cards,
    		items: $items,
    		buttons: $buttons,
    		navbars: $navbars,
    		others: $others
    	};

    	const codeShown = writable(false);
    	validate_store(codeShown, 'codeShown');
    	component_subscribe($$self, codeShown, value => $$invalidate(2, $codeShown = value));
    	const showCode = newStatus => codeShown.set(newStatus);

    	$$self.$$.on_mount.push(function () {
    		if (type === undefined && !('type' in $$props || $$self.$$.bound[$$self.$$.props['type']])) {
    			console.warn("<ComponentWrapper> was created without expected prop 'type'");
    		}

    		if (comp === undefined && !('comp' in $$props || $$self.$$.bound[$$self.$$.props['comp']])) {
    			console.warn("<ComponentWrapper> was created without expected prop 'comp'");
    		}
    	});

    	const writable_props = ['type', 'comp'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ComponentWrapper> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => showCode(true);

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('comp' in $$props) $$invalidate(1, comp = $$props.comp);
    		if ('$$scope' in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		CardCode: CodePopup,
    		writable,
    		Icon,
    		faCode: faCode.faCode,
    		cards,
    		items,
    		buttons,
    		navbars,
    		others,
    		type,
    		comp,
    		data,
    		codeShown,
    		showCode,
    		$others,
    		$navbars,
    		$buttons,
    		$items,
    		$cards,
    		$codeShown
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('comp' in $$props) $$invalidate(1, comp = $$props.comp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		type,
    		comp,
    		$codeShown,
    		data,
    		codeShown,
    		showCode,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class ComponentWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { type: 0, comp: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ComponentWrapper",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get type() {
    		throw new Error("<ComponentWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<ComponentWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get comp() {
    		throw new Error("<ComponentWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set comp(value) {
    		throw new Error("<ComponentWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/cards/CardHello.svelte generated by Svelte v3.59.2 */

    const file$l = "src/sections/cards/CardHello.svelte";

    function create_fragment$l(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h2;
    	let t2;
    	let p;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The Hello Card";
    			t2 = space();
    			p = element("p");
    			p.textContent = "The image gets bigger when you hover over it (or tap it on mobile). The info of the card gets hidden when the card gets bigger.";
    			if (!src_url_equal(img.src, img_src_value = "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1t5qjbe");
    			toggle_class(img, "tapped", /*tapped*/ ctx[0]);
    			add_location(img, file$l, 6, 2, 136);
    			attr_dev(h2, "class", "svelte-1t5qjbe");
    			add_location(h2, file$l, 8, 4, 322);
    			add_location(p, file$l, 9, 4, 350);
    			attr_dev(div0, "class", "card-hello-info svelte-1t5qjbe");
    			add_location(div0, file$l, 7, 2, 288);
    			attr_dev(div1, "class", "card-hello svelte-1t5qjbe");
    			add_location(div1, file$l, 5, 0, 87);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t2);
    			append_dev(div0, p);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*toggleCard*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tapped*/ 1) {
    				toggle_class(img, "tapped", /*tapped*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardHello', slots, []);
    	let tapped = false;
    	const toggleCard = () => $$invalidate(0, tapped = !tapped);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardHello> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ tapped, toggleCard });

    	$$self.$inject_state = $$props => {
    		if ('tapped' in $$props) $$invalidate(0, tapped = $$props.tapped);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [tapped, toggleCard];
    }

    class CardHello extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardHello",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/sections/cards/CardIdentity.svelte generated by Svelte v3.59.2 */

    const file$k = "src/sections/cards/CardIdentity.svelte";

    function create_fragment$k(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let p;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "The ID card";
    			t2 = space();
    			p = element("p");
    			p.textContent = "A card convenient to depict someone's identity.";
    			if (!src_url_equal(img.src, img_src_value = "https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "avatar");
    			attr_dev(img, "class", "card-identity-img svelte-trdgqn");
    			add_location(img, file$k, 3, 8, 262);
    			attr_dev(h2, "class", "svelte-trdgqn");
    			add_location(h2, file$k, 4, 8, 424);
    			attr_dev(div0, "class", "card-identity-avatar svelte-trdgqn");
    			add_location(div0, file$k, 2, 4, 219);
    			attr_dev(p, "class", "svelte-trdgqn");
    			add_location(p, file$k, 6, 4, 460);
    			attr_dev(div1, "class", "card-identity-content svelte-trdgqn");
    			add_location(div1, file$k, 1, 2, 179);
    			attr_dev(div2, "class", "card-identity svelte-trdgqn");
    			set_style(div2, "background-image", "url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)");
    			add_location(div2, file$k, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h2);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardIdentity', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardIdentity> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardIdentity extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardIdentity",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/sections/cards/CardPick.svelte generated by Svelte v3.59.2 */

    const file$j = "src/sections/cards/CardPick.svelte";

    function create_fragment$j(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h2;
    	let t2;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The Pick card";
    			t2 = space();
    			p = element("p");
    			p.textContent = "It goes up when you hover over it.";
    			if (!src_url_equal(img.src, img_src_value = "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-bwxcp5");
    			add_location(img, file$j, 1, 2, 26);
    			attr_dev(h2, "class", "svelte-bwxcp5");
    			add_location(h2, file$j, 3, 4, 198);
    			add_location(p, file$j, 4, 4, 225);
    			attr_dev(div0, "class", "card-pick-info svelte-bwxcp5");
    			add_location(div0, file$j, 2, 2, 165);
    			attr_dev(div1, "class", "card-pick svelte-bwxcp5");
    			add_location(div1, file$j, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardPick', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardPick> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardPick extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardPick",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    var faChevronUp = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'chevron-up';
    var width = 448;
    var height = 512;
    var ligatures = [];
    var unicode = 'f077';
    var svgPathData = 'M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faChevronUp = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faChevronDown = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'chevron-down';
    var width = 448;
    var height = 512;
    var ligatures = [];
    var unicode = 'f078';
    var svgPathData = 'M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faChevronDown = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    /* src/sections/cards/CardSkills.svelte generated by Svelte v3.59.2 */
    const file$i = "src/sections/cards/CardSkills.svelte";

    function create_fragment$i(ctx) {
    	let div4;
    	let div0;
    	let h2;
    	let t1;
    	let div3;
    	let div1;
    	let p;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;
    	let t9;
    	let li3;
    	let t11;
    	let li4;
    	let t13;
    	let li5;
    	let t15;
    	let div2;
    	let icon;
    	let t16;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new Icon({
    			props: {
    				icon: /*isShown*/ ctx[0] ? faChevronUp.faChevronUp : faChevronDown.faChevronDown
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The skills card";
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "A card with a collapsable list of skills.";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "🧠 an Einstein-level brain";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "🐘 the memory of an elephant";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "💪 Norrissian muscles";
    			t9 = space();
    			li3 = element("li");
    			li3.textContent = "🎸 a rock-star creativity";
    			t11 = space();
    			li4 = element("li");
    			li4.textContent = "🍷 romantic enough to shame a Frenchman";
    			t13 = space();
    			li5 = element("li");
    			li5.textContent = "👾 geeker than a 4chan teenager";
    			t15 = space();
    			div2 = element("div");
    			create_component(icon.$$.fragment);
    			t16 = text(" More");
    			attr_dev(h2, "class", "svelte-xwxz1m");
    			add_location(h2, file$i, 11, 4, 494);
    			attr_dev(div0, "class", "card-skills-img svelte-xwxz1m");
    			set_style(div0, "background-image", "url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)");
    			add_location(div0, file$i, 10, 2, 311);
    			add_location(p, file$i, 15, 6, 631);
    			add_location(li0, file$i, 17, 8, 699);
    			add_location(li1, file$i, 18, 8, 743);
    			add_location(li2, file$i, 19, 8, 789);
    			add_location(li3, file$i, 20, 8, 828);
    			add_location(li4, file$i, 21, 8, 871);
    			add_location(li5, file$i, 22, 8, 928);
    			attr_dev(ul, "class", "svelte-xwxz1m");
    			add_location(ul, file$i, 16, 6, 686);
    			attr_dev(div1, "class", "card-skills-info-content svelte-xwxz1m");
    			add_location(div1, file$i, 14, 4, 586);
    			attr_dev(div2, "class", "card-skills-info-more svelte-xwxz1m");
    			add_location(div2, file$i, 25, 4, 996);
    			attr_dev(div3, "class", "card-skills-info svelte-xwxz1m");
    			toggle_class(div3, "show", /*isShown*/ ctx[0]);
    			add_location(div3, file$i, 13, 2, 530);
    			attr_dev(div4, "class", "card-skills svelte-xwxz1m");
    			add_location(div4, file$i, 9, 0, 283);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, h2);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(ul, t11);
    			append_dev(ul, li4);
    			append_dev(ul, t13);
    			append_dev(ul, li5);
    			append_dev(div3, t15);
    			append_dev(div3, div2);
    			mount_component(icon, div2, null);
    			append_dev(div2, t16);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*toggleShow*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const icon_changes = {};
    			if (dirty & /*isShown*/ 1) icon_changes.icon = /*isShown*/ ctx[0] ? faChevronUp.faChevronUp : faChevronDown.faChevronDown;
    			icon.$set(icon_changes);

    			if (!current || dirty & /*isShown*/ 1) {
    				toggle_class(div3, "show", /*isShown*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardSkills', slots, []);
    	let isShown = false;
    	const toggleShow = () => $$invalidate(0, isShown = !isShown);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardSkills> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Icon,
    		faChevronUp: faChevronUp.faChevronUp,
    		faChevronDown: faChevronDown.faChevronDown,
    		isShown,
    		toggleShow
    	});

    	$$self.$inject_state = $$props => {
    		if ('isShown' in $$props) $$invalidate(0, isShown = $$props.isShown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isShown, toggleShow];
    }

    class CardSkills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardSkills",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/sections/cards/CardDiapo.svelte generated by Svelte v3.59.2 */
    const file$h = "src/sections/cards/CardDiapo.svelte";

    function create_fragment$h(ctx) {
    	let div6;
    	let div1;
    	let div0;
    	let h20;
    	let t1;
    	let p0;
    	let t3;
    	let div3;
    	let div2;
    	let h21;
    	let t5;
    	let p1;
    	let t7;
    	let div5;
    	let div4;
    	let h22;
    	let t9;
    	let p2;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h20 = element("h2");
    			h20.textContent = "The Bad";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "The diapo card";
    			t3 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h21 = element("h2");
    			h21.textContent = "The Good";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "The diapo card";
    			t7 = space();
    			div5 = element("div");
    			div4 = element("div");
    			h22 = element("h2");
    			h22.textContent = "The Ugly";
    			t9 = space();
    			p2 = element("p");
    			p2.textContent = "The diapo card";
    			attr_dev(h20, "class", "svelte-bz2857");
    			add_location(h20, file$h, 19, 6, 648);
    			attr_dev(p0, "class", "svelte-bz2857");
    			add_location(p0, file$h, 20, 6, 671);
    			attr_dev(div0, "class", "card-diapo-text svelte-bz2857");
    			add_location(div0, file$h, 18, 4, 612);
    			attr_dev(div1, "class", "card-diapo-img show svelte-bz2857");
    			set_style(div1, "background-image", "url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg)");
    			set_style(div1, "background-position-x", "left");
    			add_location(div1, file$h, 17, 2, 451);
    			attr_dev(h21, "class", "svelte-bz2857");
    			add_location(h21, file$h, 25, 6, 909);
    			attr_dev(p1, "class", "svelte-bz2857");
    			add_location(p1, file$h, 26, 6, 933);
    			attr_dev(div2, "class", "card-diapo-text svelte-bz2857");
    			add_location(div2, file$h, 24, 4, 873);
    			attr_dev(div3, "class", "card-diapo-img svelte-bz2857");
    			set_style(div3, "background-image", "url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg)");
    			set_style(div3, "background-position-x", "center");
    			add_location(div3, file$h, 23, 2, 715);
    			attr_dev(h22, "class", "svelte-bz2857");
    			add_location(h22, file$h, 31, 6, 1170);
    			attr_dev(p2, "class", "svelte-bz2857");
    			add_location(p2, file$h, 32, 6, 1194);
    			attr_dev(div4, "class", "card-diapo-text svelte-bz2857");
    			add_location(div4, file$h, 30, 4, 1134);
    			attr_dev(div5, "class", "card-diapo-img svelte-bz2857");
    			set_style(div5, "background-image", "url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg)");
    			set_style(div5, "background-position-x", "right");
    			add_location(div5, file$h, 29, 2, 977);
    			attr_dev(div6, "class", "card-diapo svelte-bz2857");
    			add_location(div6, file$h, 16, 0, 424);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h20);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div6, t3);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h21);
    			append_dev(div2, t5);
    			append_dev(div2, p1);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, h22);
    			append_dev(div4, t9);
    			append_dev(div4, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardDiapo', slots, []);

    	onMount(() => {
    		let imgIndex = 1;
    		const cardDiapoImgs = document.querySelectorAll(".card-diapo-img");

    		setInterval(
    			() => {
    				cardDiapoImgs.forEach(cardDiapoImg => {
    					cardDiapoImg.classList.remove("show");
    				});

    				cardDiapoImgs[imgIndex].classList.add("show");
    				imgIndex = (imgIndex + 1) % cardDiapoImgs.length;
    			},
    			5000
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardDiapo> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount });
    	return [];
    }

    class CardDiapo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardDiapo",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/sections/cards/CardNeumorph.svelte generated by Svelte v3.59.2 */

    const file$g = "src/sections/cards/CardNeumorph.svelte";

    function create_fragment$g(ctx) {
    	let div1;
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let h2;
    	let t6;
    	let a;
    	let t8;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "⚭";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Y";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "⌬";
    			t5 = space();
    			h2 = element("h2");
    			t6 = text("The ");
    			a = element("a");
    			a.textContent = "Neumorphism";
    			t8 = text(" card");
    			attr_dev(p0, "class", "svelte-n84m1p");
    			add_location(p0, file$g, 2, 4, 70);
    			attr_dev(p1, "class", "svelte-n84m1p");
    			add_location(p1, file$g, 3, 4, 83);
    			attr_dev(p2, "class", "svelte-n84m1p");
    			add_location(p2, file$g, 4, 4, 96);
    			attr_dev(div0, "class", "card-neumorph-buttons svelte-n84m1p");
    			add_location(div0, file$g, 1, 2, 30);
    			attr_dev(a, "href", "https://neumorphism.io");
    			attr_dev(a, "class", "svelte-n84m1p");
    			add_location(a, file$g, 6, 10, 124);
    			attr_dev(h2, "class", "svelte-n84m1p");
    			add_location(h2, file$g, 6, 2, 116);
    			attr_dev(div1, "class", "card-neumorph svelte-n84m1p");
    			add_location(div1, file$g, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(div0, t3);
    			append_dev(div0, p2);
    			append_dev(div1, t5);
    			append_dev(div1, h2);
    			append_dev(h2, t6);
    			append_dev(h2, a);
    			append_dev(h2, t8);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardNeumorph', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardNeumorph> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardNeumorph extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardNeumorph",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/sections/cards/CardStack.svelte generated by Svelte v3.59.2 */

    const file$f = "src/sections/cards/CardStack.svelte";

    function create_fragment$f(ctx) {
    	let div;
    	let a0;
    	let h20;
    	let t1;
    	let p0;
    	let t3;
    	let a1;
    	let h21;
    	let t5;
    	let p1;
    	let t7;
    	let a2;
    	let h22;
    	let t9;
    	let p2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a0 = element("a");
    			h20 = element("h2");
    			h20.textContent = "Third item";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "A third item card that looks great";
    			t3 = space();
    			a1 = element("a");
    			h21 = element("h2");
    			h21.textContent = "Second item";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "A second item card that looks great";
    			t7 = space();
    			a2 = element("a");
    			h22 = element("h2");
    			h22.textContent = "First item";
    			t9 = space();
    			p2 = element("p");
    			p2.textContent = "A first item card that looks great. ( to be used for Desktop view)";
    			attr_dev(h20, "class", "svelte-hcozf0");
    			add_location(h20, file$f, 2, 4, 238);
    			attr_dev(p0, "class", "svelte-hcozf0");
    			add_location(p0, file$f, 3, 4, 262);
    			attr_dev(a0, "href", "https://en.wikipedia.org/wiki/Alps");
    			attr_dev(a0, "class", "card-stack-item svelte-hcozf0");
    			set_style(a0, "background-image", "url(https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)");
    			add_location(a0, file$f, 1, 2, 27);
    			attr_dev(h21, "class", "svelte-hcozf0");
    			add_location(h21, file$f, 6, 4, 554);
    			attr_dev(p1, "class", "svelte-hcozf0");
    			add_location(p1, file$f, 7, 4, 579);
    			attr_dev(a1, "href", "https://en.wikipedia.org/wiki/Antelope_Canyon");
    			attr_dev(a1, "class", "card-stack-item svelte-hcozf0");
    			set_style(a1, "background-image", "url(https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)");
    			add_location(a1, file$f, 5, 2, 313);
    			attr_dev(h22, "class", "svelte-hcozf0");
    			add_location(h22, file$f, 10, 4, 863);
    			attr_dev(p2, "class", "svelte-hcozf0");
    			add_location(p2, file$f, 11, 4, 887);
    			attr_dev(a2, "href", "https://en.wikipedia.org/wiki/Canal_du_Midi");
    			attr_dev(a2, "class", "card-stack-item svelte-hcozf0");
    			set_style(a2, "background-image", "url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)");
    			add_location(a2, file$f, 9, 2, 631);
    			attr_dev(div, "class", "card-stack svelte-hcozf0");
    			add_location(div, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(a0, h20);
    			append_dev(a0, t1);
    			append_dev(a0, p0);
    			append_dev(div, t3);
    			append_dev(div, a1);
    			append_dev(a1, h21);
    			append_dev(a1, t5);
    			append_dev(a1, p1);
    			append_dev(div, t7);
    			append_dev(div, a2);
    			append_dev(a2, h22);
    			append_dev(a2, t9);
    			append_dev(a2, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardStack', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardStack> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardStack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardStack",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/sections/cards/CardVinyl.svelte generated by Svelte v3.59.2 */

    const file$e = "src/sections/cards/CardVinyl.svelte";

    function create_fragment$e(ctx) {
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let div0;
    	let h2;
    	let t3;
    	let p;
    	let t4;
    	let a;
    	let t6;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img0 = element("img");
    			t0 = space();
    			img1 = element("img");
    			t1 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Vinyl Card";
    			t3 = space();
    			p = element("p");
    			t4 = text("Largely inspired by ");
    			a = element("a");
    			a.textContent = "Babin Bohara";
    			t6 = text(" previous work.");
    			attr_dev(img0, "alt", "anteloupe canyon");
    			attr_dev(img0, "class", "card-vinyl-item svelte-fk979f");
    			if (!src_url_equal(img0.src, img0_src_value = "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$e, 1, 2, 27);
    			attr_dev(img1, "alt", "alps");
    			attr_dev(img1, "class", "card-vinyl-item svelte-fk979f");
    			if (!src_url_equal(img1.src, img1_src_value = "https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$e, 6, 2, 223);
    			attr_dev(h2, "class", "svelte-fk979f");
    			add_location(h2, file$e, 15, 4, 582);
    			attr_dev(a, "id", "babin");
    			attr_dev(a, "href", "https://github.com/nibab-boo");
    			attr_dev(a, "class", "svelte-fk979f");
    			add_location(a, file$e, 17, 26, 636);
    			attr_dev(p, "class", "svelte-fk979f");
    			add_location(p, file$e, 16, 4, 606);
    			attr_dev(div0, "class", "card-vinyl-item svelte-fk979f");
    			set_style(div0, "background-image", "url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)");
    			add_location(div0, file$e, 11, 2, 388);
    			attr_dev(div1, "class", "card-vinyl svelte-fk979f");
    			add_location(div1, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img0);
    			append_dev(div1, t0);
    			append_dev(div1, img1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    			append_dev(p, t4);
    			append_dev(p, a);
    			append_dev(p, t6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardVinyl', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardVinyl> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardVinyl extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardVinyl",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/sections/cards/CardSimple.svelte generated by Svelte v3.59.2 */

    const file$d = "src/sections/cards/CardSimple.svelte";

    function create_fragment$d(ctx) {
    	let div4;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div0;
    	let span0;
    	let span1;
    	let t3;
    	let div3;
    	let img1;
    	let img1_src_value;
    	let t4;
    	let div1;
    	let t6;
    	let div2;
    	let h2;
    	let t8;
    	let p;
    	let t10;
    	let a;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Travel";
    			span1 = element("span");
    			span1.textContent = "Landscape";
    			t3 = space();
    			div3 = element("div");
    			img1 = element("img");
    			t4 = space();
    			div1 = element("div");
    			div1.textContent = "¥200";
    			t6 = space();
    			div2 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Simple Card";
    			t8 = space();
    			p = element("p");
    			p.textContent = "A slightly simple but nice and efficient that does the job 💪";
    			t10 = space();
    			a = element("a");
    			a.textContent = "A button";
    			attr_dev(img0, "alt", "anteloupe canyon");
    			attr_dev(img0, "class", "card-simple-image svelte-r2zjyq");
    			if (!src_url_equal(img0.src, img0_src_value = "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$d, 1, 2, 28);
    			attr_dev(span0, "class", "tag-green svelte-r2zjyq");
    			add_location(span0, file$d, 7, 4, 260);
    			attr_dev(span1, "class", "tag-orange svelte-r2zjyq");
    			add_location(span1, file$d, 7, 41, 297);
    			attr_dev(div0, "class", "card-simple-tags svelte-r2zjyq");
    			add_location(div0, file$d, 6, 2, 225);
    			if (!src_url_equal(img1.src, img1_src_value = "https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "card-simple-avatar svelte-r2zjyq");
    			attr_dev(img1, "alt", "avatar");
    			add_location(img1, file$d, 13, 4, 398);
    			attr_dev(div1, "class", "price-tag svelte-r2zjyq");
    			add_location(div1, file$d, 18, 4, 581);
    			attr_dev(h2, "class", "svelte-r2zjyq");
    			add_location(h2, file$d, 20, 6, 631);
    			add_location(p, file$d, 21, 6, 658);
    			add_location(div2, file$d, 19, 4, 619);
    			attr_dev(a, "class", "card-simple-button svelte-r2zjyq");
    			attr_dev(a, "href", "https://yannklein.dev/");
    			add_location(a, file$d, 23, 4, 742);
    			attr_dev(div3, "class", "card-simple-text svelte-r2zjyq");
    			add_location(div3, file$d, 12, 2, 363);
    			attr_dev(div4, "class", "card-simple svelte-r2zjyq");
    			add_location(div4, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, img0);
    			append_dev(div4, t0);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(div0, span1);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, img1);
    			append_dev(div3, t4);
    			append_dev(div3, div1);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, h2);
    			append_dev(div2, t8);
    			append_dev(div2, p);
    			append_dev(div3, t10);
    			append_dev(div3, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardSimple', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardSimple> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class CardSimple extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardSimple",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/sections/SectionCards.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1$3 } = globals;
    const file$c = "src/sections/SectionCards.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (23:6) <ComponentWrapper type="cards" comp={cardName}>
    function create_default_slot$4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*cardName*/ ctx[3])];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$cards*/ 1 && switch_value !== (switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*cardName*/ ctx[3])])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(23:6) <ComponentWrapper type=\\\"cards\\\" comp={cardName}>",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#each Object.keys($cards) as cardName}
    function create_each_block$4(ctx) {
    	let componentwrapper;
    	let current;

    	componentwrapper = new ComponentWrapper({
    			props: {
    				type: "cards",
    				comp: /*cardName*/ ctx[3],
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentwrapper.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentwrapper_changes = {};
    			if (dirty & /*$cards*/ 1) componentwrapper_changes.comp = /*cardName*/ ctx[3];

    			if (dirty & /*$$scope, $cards*/ 65) {
    				componentwrapper_changes.$$scope = { dirty, ctx };
    			}

    			componentwrapper.$set(componentwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(22:4) {#each Object.keys($cards) as cardName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div0;
    	let current;
    	let each_value = Object.keys(/*$cards*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "❐ Cards";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Cards to be used in grids";
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-1dg5wn0");
    			add_location(h2, file$c, 18, 2, 875);
    			attr_dev(p, "class", "svelte-1dg5wn0");
    			add_location(p, file$c, 19, 2, 894);
    			attr_dev(div0, "class", "cards svelte-1dg5wn0");
    			add_location(div0, file$c, 20, 2, 929);
    			attr_dev(div1, "id", "cards-section");
    			attr_dev(div1, "class", "page-section svelte-1dg5wn0");
    			add_location(div1, file$c, 17, 0, 827);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $cards, components, componizeString*/ 7) {
    				each_value = Object.keys(/*$cards*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $cards;
    	validate_store(cards, 'cards');
    	component_subscribe($$self, cards, $$value => $$invalidate(0, $cards = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionCards', slots, []);

    	const components = {
    		CardHello,
    		CardIdentity,
    		CardPick,
    		CardSkills,
    		CardDiapo,
    		CardNeumorph,
    		CardStack,
    		CardVinyl,
    		CardSimple
    	};

    	const componizeString = name => `Card${name[0].toUpperCase()}${name.substring(1)}`;
    	const writable_props = [];

    	Object_1$3.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionCards> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ComponentWrapper,
    		CardHello,
    		CardIdentity,
    		CardPick,
    		CardSkills,
    		CardDiapo,
    		CardNeumorph,
    		CardStack,
    		CardVinyl,
    		CardSimple,
    		cards,
    		components,
    		componizeString,
    		$cards
    	});

    	return [$cards, components, componizeString];
    }

    class SectionCards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionCards",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/sections/items/Item3d.svelte generated by Svelte v3.59.2 */

    const file$b = "src/sections/items/Item3d.svelte";

    function create_fragment$b(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div1;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The 3D item";
    			t1 = space();
    			p = element("p");
    			p.textContent = "An icon that pops up out of the card.";
    			t3 = space();
    			div1 = element("div");
    			img = element("img");
    			attr_dev(h2, "class", "svelte-9ct09z");
    			add_location(h2, file$b, 2, 4, 58);
    			attr_dev(p, "class", "svelte-9ct09z");
    			add_location(p, file$b, 3, 4, 83);
    			attr_dev(div0, "class", "item-3d-content svelte-9ct09z");
    			add_location(div0, file$b, 1, 2, 24);
    			if (!src_url_equal(img.src, img_src_value = "youtube.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-9ct09z");
    			add_location(img, file$b, 6, 4, 170);
    			attr_dev(div1, "class", "item-3d-icon svelte-9ct09z");
    			add_location(div1, file$b, 5, 2, 139);
    			attr_dev(div2, "class", "item-3d svelte-9ct09z");
    			add_location(div2, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, img);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Item3d', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Item3d> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Item3d extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item3d",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    var faEdit = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'edit';
    var width = 576;
    var height = 512;
    var ligatures = [];
    var unicode = 'f044';
    var svgPathData = 'M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faEdit = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faTrash = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'trash';
    var width = 448;
    var height = 512;
    var ligatures = [];
    var unicode = 'f1f8';
    var svgPathData = 'M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faTrash = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    var faEllipsisV = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    var prefix = 'fas';
    var iconName = 'ellipsis-v';
    var width = 192;
    var height = 512;
    var ligatures = [];
    var unicode = 'f142';
    var svgPathData = 'M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z';

    exports.definition = {
      prefix: prefix,
      iconName: iconName,
      icon: [
        width,
        height,
        ligatures,
        unicode,
        svgPathData
      ]};

    exports.faEllipsisV = exports.definition;
    exports.prefix = prefix;
    exports.iconName = iconName;
    exports.width = width;
    exports.height = height;
    exports.ligatures = ligatures;
    exports.unicode = unicode;
    exports.svgPathData = svgPathData;
    });

    /* src/sections/items/ItemDrawer.svelte generated by Svelte v3.59.2 */
    const file$a = "src/sections/items/ItemDrawer.svelte";

    function create_fragment$a(ctx) {
    	let div3;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let icon0;
    	let t2;
    	let div2;
    	let a0;
    	let icon1;
    	let t3;
    	let a1;
    	let icon2;
    	let current;
    	let mounted;
    	let dispose;

    	icon0 = new Icon({
    			props: { icon: faEllipsisV.faEllipsisV },
    			$$inline: true
    		});

    	icon1 = new Icon({ props: { icon: faEdit.faEdit }, $$inline: true });
    	icon2 = new Icon({ props: { icon: faTrash.faTrash }, $$inline: true });

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The drawer item";
    			t1 = space();
    			div1 = element("div");
    			create_component(icon0.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			a0 = element("a");
    			create_component(icon1.$$.fragment);
    			t3 = space();
    			a1 = element("a");
    			create_component(icon2.$$.fragment);
    			attr_dev(h2, "class", "svelte-1u7d0te");
    			add_location(h2, file$a, 12, 4, 433);
    			attr_dev(div0, "class", "item-drawer-content svelte-1u7d0te");
    			add_location(div0, file$a, 11, 2, 395);
    			attr_dev(div1, "class", "item-drawer-button svelte-1u7d0te");
    			add_location(div1, file$a, 14, 2, 469);
    			attr_dev(a0, "href", "#edit");
    			attr_dev(a0, "class", "svelte-1u7d0te");
    			add_location(a0, file$a, 18, 4, 607);
    			attr_dev(a1, "href", "#remove");
    			attr_dev(a1, "class", "svelte-1u7d0te");
    			add_location(a1, file$a, 19, 4, 653);
    			attr_dev(div2, "class", "item-drawer-settings svelte-1u7d0te");
    			add_location(div2, file$a, 17, 2, 568);
    			attr_dev(div3, "class", "item-drawer svelte-1u7d0te");
    			toggle_class(div3, "active", /*isActive*/ ctx[0]);
    			add_location(div3, file$a, 10, 0, 343);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h2);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			mount_component(icon0, div1, null);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			mount_component(icon1, a0, null);
    			append_dev(div2, t3);
    			append_dev(div2, a1);
    			mount_component(icon2, a1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*toggleActive*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*isActive*/ 1) {
    				toggle_class(div3, "active", /*isActive*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(icon2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(icon2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(icon0);
    			destroy_component(icon1);
    			destroy_component(icon2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ItemDrawer', slots, []);
    	let isActive = false;
    	const toggleActive = () => $$invalidate(0, isActive = !isActive);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemDrawer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Icon,
    		faEdit: faEdit.faEdit,
    		faTrash: faTrash.faTrash,
    		faEllipsisV: faEllipsisV.faEllipsisV,
    		isActive,
    		toggleActive
    	});

    	$$self.$inject_state = $$props => {
    		if ('isActive' in $$props) $$invalidate(0, isActive = $$props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isActive, toggleActive];
    }

    class ItemDrawer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ItemDrawer",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/sections/items/ItemFlip.svelte generated by Svelte v3.59.2 */

    const file$9 = "src/sections/items/ItemFlip.svelte";

    function create_fragment$9(ctx) {
    	let div5;
    	let div4;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let p0;
    	let t3;
    	let div3;
    	let div2;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "The flipping item";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Hover it (or click it on mobile) to display...";
    			t3 = space();
    			div3 = element("div");
    			div2 = element("div");
    			p1 = element("p");
    			p1.textContent = "The back of the card!";
    			attr_dev(h2, "class", "svelte-xfqwn9");
    			add_location(h2, file$9, 9, 8, 280);
    			attr_dev(p0, "class", "svelte-xfqwn9");
    			add_location(p0, file$9, 10, 8, 315);
    			attr_dev(div0, "class", "item-flip-content svelte-xfqwn9");
    			add_location(div0, file$9, 8, 6, 240);
    			attr_dev(div1, "class", "item-flip-front svelte-xfqwn9");
    			add_location(div1, file$9, 7, 4, 204);
    			attr_dev(p1, "class", "svelte-xfqwn9");
    			add_location(p1, file$9, 15, 8, 472);
    			attr_dev(div2, "class", "item-flip-content svelte-xfqwn9");
    			add_location(div2, file$9, 14, 6, 432);
    			attr_dev(div3, "class", "item-flip-back svelte-xfqwn9");
    			add_location(div3, file$9, 13, 4, 397);
    			attr_dev(div4, "class", "item-flip-inner svelte-xfqwn9");
    			add_location(div4, file$9, 6, 2, 170);
    			attr_dev(div5, "class", "item-flip svelte-xfqwn9");
    			toggle_class(div5, "flipped", /*isFlipped*/ ctx[0]);
    			add_location(div5, file$9, 5, 0, 96);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, p1);

    			if (!mounted) {
    				dispose = listen_dev(div5, "click", /*toggleFlip*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isFlipped*/ 1) {
    				toggle_class(div5, "flipped", /*isFlipped*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ItemFlip', slots, []);
    	let isFlipped = false;
    	const toggleFlip = () => $$invalidate(0, isFlipped = !isFlipped);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemFlip> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ isFlipped, toggleFlip });

    	$$self.$inject_state = $$props => {
    		if ('isFlipped' in $$props) $$invalidate(0, isFlipped = $$props.isFlipped);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isFlipped, toggleFlip];
    }

    class ItemFlip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ItemFlip",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/sections/SectionItems.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1$2 } = globals;
    const file$8 = "src/sections/SectionItems.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (17:4) <ComponentWrapper type="items" comp={itemName}>
    function create_default_slot$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*itemName*/ ctx[3])];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$items*/ 1 && switch_value !== (switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*itemName*/ ctx[3])])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(17:4) <ComponentWrapper type=\\\"items\\\" comp={itemName}>",
    		ctx
    	});

    	return block;
    }

    // (16:4) {#each Object.keys($items) as itemName}
    function create_each_block$3(ctx) {
    	let componentwrapper;
    	let current;

    	componentwrapper = new ComponentWrapper({
    			props: {
    				type: "items",
    				comp: /*itemName*/ ctx[3],
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentwrapper.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentwrapper_changes = {};
    			if (dirty & /*$items*/ 1) componentwrapper_changes.comp = /*itemName*/ ctx[3];

    			if (dirty & /*$$scope, $items*/ 65) {
    				componentwrapper_changes.$$scope = { dirty, ctx };
    			}

    			componentwrapper.$set(componentwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(16:4) {#each Object.keys($items) as itemName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div0;
    	let current;
    	let each_value = Object.keys(/*$items*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "❐ Item Cards";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Items with some simple animations";
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-1e1o145");
    			add_location(h2, file$8, 12, 2, 465);
    			attr_dev(p, "class", "svelte-1e1o145");
    			add_location(p, file$8, 13, 2, 489);
    			attr_dev(div0, "class", "items svelte-1e1o145");
    			add_location(div0, file$8, 14, 2, 532);
    			attr_dev(div1, "id", "items-section");
    			attr_dev(div1, "class", "page-section svelte-1e1o145");
    			add_location(div1, file$8, 11, 0, 417);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $items, components, componizeString*/ 7) {
    				each_value = Object.keys(/*$items*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $items;
    	validate_store(items, 'items');
    	component_subscribe($$self, items, $$value => $$invalidate(0, $items = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionItems', slots, []);
    	const components = { Item3d, ItemDrawer, ItemFlip };
    	const componizeString = name => `Item${name[0].toUpperCase()}${name.substring(1)}`;
    	const writable_props = [];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionItems> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ComponentWrapper,
    		Item3d,
    		ItemDrawer,
    		ItemFlip,
    		items,
    		components,
    		componizeString,
    		$items
    	});

    	return [$items, components, componizeString];
    }

    class SectionItems extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionItems",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/sections/buttons/ButtonPush.svelte generated by Svelte v3.59.2 */

    const file$7 = "src/sections/buttons/ButtonPush.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let a;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			a.textContent = "PUSH";
    			attr_dev(a, "href", "https://yannklein.dev/");
    			attr_dev(a, "class", "svelte-yqz88o");
    			add_location(a, file$7, 1, 2, 28);
    			attr_dev(div, "class", "button-push svelte-yqz88o");
    			add_location(div, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ButtonPush', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ButtonPush> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ButtonPush extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonPush",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/sections/buttons/ButtonBeforeAfter.svelte generated by Svelte v3.59.2 */

    const file$6 = "src/sections/buttons/ButtonBeforeAfter.svelte";

    function create_fragment$6(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "I'm the content";
    			attr_dev(div, "class", "button-before-after svelte-957lmo");
    			attr_dev(div, "data-before", "I'm before 👹");
    			attr_dev(div, "data-after", "I'm after 😈");
    			add_location(div, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ButtonBeforeAfter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ButtonBeforeAfter> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ButtonBeforeAfter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonBeforeAfter",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/sections/SectionButtons.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1$1 } = globals;
    const file$5 = "src/sections/SectionButtons.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (17:4) <ComponentWrapper type="buttons" comp={buttonName}>
    function create_default_slot$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*buttonName*/ ctx[3])];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$buttons*/ 1 && switch_value !== (switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*buttonName*/ ctx[3])])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(17:4) <ComponentWrapper type=\\\"buttons\\\" comp={buttonName}>",
    		ctx
    	});

    	return block;
    }

    // (16:4) {#each Object.keys($buttons) as buttonName}
    function create_each_block$2(ctx) {
    	let componentwrapper;
    	let current;

    	componentwrapper = new ComponentWrapper({
    			props: {
    				type: "buttons",
    				comp: /*buttonName*/ ctx[3],
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentwrapper.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentwrapper_changes = {};
    			if (dirty & /*$buttons*/ 1) componentwrapper_changes.comp = /*buttonName*/ ctx[3];

    			if (dirty & /*$$scope, $buttons*/ 65) {
    				componentwrapper_changes.$$scope = { dirty, ctx };
    			}

    			componentwrapper.$set(componentwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(16:4) {#each Object.keys($buttons) as buttonName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div0;
    	let current;
    	let each_value = Object.keys(/*$buttons*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "❐ Buttons";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Buttons with creative CSS";
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-16moxz2");
    			add_location(h2, file$5, 12, 2, 451);
    			attr_dev(p, "class", "svelte-16moxz2");
    			add_location(p, file$5, 13, 2, 472);
    			attr_dev(div0, "class", "buttons svelte-16moxz2");
    			add_location(div0, file$5, 14, 2, 507);
    			attr_dev(div1, "id", "buttons-section");
    			attr_dev(div1, "class", "page-section svelte-16moxz2");
    			add_location(div1, file$5, 11, 0, 401);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $buttons, components, componizeString*/ 7) {
    				each_value = Object.keys(/*$buttons*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $buttons;
    	validate_store(buttons, 'buttons');
    	component_subscribe($$self, buttons, $$value => $$invalidate(0, $buttons = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionButtons', slots, []);
    	const components = { ButtonPush, ButtonBeforeAfter };
    	const componizeString = name => `Button${name[0].toUpperCase()}${name.substring(1)}`;
    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionButtons> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ComponentWrapper,
    		ButtonPush,
    		ButtonBeforeAfter,
    		buttons,
    		components,
    		componizeString,
    		$buttons
    	});

    	return [$buttons, components, componizeString];
    }

    class SectionButtons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionButtons",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/sections/navbars/NavbarVanilla.svelte generated by Svelte v3.59.2 */

    const file$4 = "src/sections/navbars/NavbarVanilla.svelte";

    function create_fragment$4(ctx) {
    	let div3;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let div2;
    	let div0;
    	let a1;
    	let t4;
    	let a2;
    	let t6;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let t7;
    	let ul;
    	let li0;
    	let a3;
    	let t9;
    	let li1;
    	let a4;
    	let t11;
    	let li2;
    	let a5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Vanilla CSS navbar";
    			t2 = space();
    			div2 = element("div");
    			div0 = element("div");
    			a1 = element("a");
    			a1.textContent = "CSS tricks";
    			t4 = space();
    			a2 = element("a");
    			a2.textContent = "Design gems";
    			t6 = space();
    			div1 = element("div");
    			img1 = element("img");
    			t7 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a3 = element("a");
    			a3.textContent = "Profile";
    			t9 = space();
    			li1 = element("li");
    			a4 = element("a");
    			a4.textContent = "About us";
    			t11 = space();
    			li2 = element("li");
    			a5 = element("a");
    			a5.textContent = "Login";
    			attr_dev(img0, "class", "navbar-vanilla-logo svelte-1k1amv9");
    			if (!src_url_equal(img0.src, img0_src_value = "youtube.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "youtube");
    			add_location(img0, file$4, 7, 4, 178);
    			attr_dev(h2, "class", "navbar-vanilla-brand svelte-1k1amv9");
    			add_location(h2, file$4, 8, 4, 248);
    			attr_dev(a0, "class", "navbar-vanilla-section svelte-1k1amv9");
    			attr_dev(a0, "href", "#home");
    			add_location(a0, file$4, 6, 2, 126);
    			attr_dev(a1, "href", "#page1");
    			attr_dev(a1, "class", "svelte-1k1amv9");
    			add_location(a1, file$4, 12, 6, 396);
    			attr_dev(a2, "href", "#page2");
    			attr_dev(a2, "class", "svelte-1k1amv9");
    			add_location(a2, file$4, 13, 6, 434);
    			attr_dev(div0, "class", "navbar-vanilla-menu svelte-1k1amv9");
    			add_location(div0, file$4, 11, 4, 356);
    			if (!src_url_equal(img1.src, img1_src_value = "https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1k1amv9");
    			add_location(img1, file$4, 16, 6, 549);
    			attr_dev(a3, "href", "#profile");
    			attr_dev(a3, "class", "svelte-1k1amv9");
    			add_location(a3, file$4, 18, 12, 718);
    			attr_dev(li0, "class", "svelte-1k1amv9");
    			add_location(li0, file$4, 18, 8, 714);
    			attr_dev(a4, "href", "#about");
    			attr_dev(a4, "class", "svelte-1k1amv9");
    			add_location(a4, file$4, 19, 12, 766);
    			attr_dev(li1, "class", "svelte-1k1amv9");
    			add_location(li1, file$4, 19, 8, 762);
    			attr_dev(a5, "href", "#login");
    			attr_dev(a5, "class", "svelte-1k1amv9");
    			add_location(a5, file$4, 20, 12, 813);
    			attr_dev(li2, "class", "svelte-1k1amv9");
    			add_location(li2, file$4, 20, 8, 809);
    			attr_dev(ul, "class", "svelte-1k1amv9");
    			add_location(ul, file$4, 17, 6, 701);
    			attr_dev(div1, "class", "navbar-vanilla-profile svelte-1k1amv9");
    			toggle_class(div1, "active", /*isActive*/ ctx[0]);
    			add_location(div1, file$4, 15, 4, 482);
    			attr_dev(div2, "class", "navbar-vanilla-section svelte-1k1amv9");
    			add_location(div2, file$4, 10, 2, 315);
    			attr_dev(div3, "class", "navbar-vanilla svelte-1k1amv9");
    			add_location(div3, file$4, 5, 0, 95);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, a0);
    			append_dev(a0, img0);
    			append_dev(a0, t0);
    			append_dev(a0, h2);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, a1);
    			append_dev(div0, t4);
    			append_dev(div0, a2);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, img1);
    			append_dev(div1, t7);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a3);
    			append_dev(ul, t9);
    			append_dev(ul, li1);
    			append_dev(li1, a4);
    			append_dev(ul, t11);
    			append_dev(ul, li2);
    			append_dev(li2, a5);

    			if (!mounted) {
    				dispose = listen_dev(img1, "click", /*toggleActive*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isActive*/ 1) {
    				toggle_class(div1, "active", /*isActive*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavbarVanilla', slots, []);
    	let isActive = false;
    	const toggleActive = () => $$invalidate(0, isActive = !isActive);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavbarVanilla> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ isActive, toggleActive });

    	$$self.$inject_state = $$props => {
    		if ('isActive' in $$props) $$invalidate(0, isActive = $$props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isActive, toggleActive];
    }

    class NavbarVanilla extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavbarVanilla",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/sections/SectionNavbar.svelte generated by Svelte v3.59.2 */
    const file$3 = "src/sections/SectionNavbar.svelte";

    // (9:2) <ComponentWrapper type="navbars" comp="vanilla">
    function create_default_slot$1(ctx) {
    	let navbarvanilla;
    	let current;
    	navbarvanilla = new NavbarVanilla({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(navbarvanilla.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbarvanilla, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbarvanilla.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbarvanilla.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbarvanilla, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(9:2) <ComponentWrapper type=\\\"navbars\\\" comp=\\\"vanilla\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let componentwrapper;
    	let current;

    	componentwrapper = new ComponentWrapper({
    			props: {
    				type: "navbars",
    				comp: "vanilla",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "❐ Navbars";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Vanilla CSS navbar with minimal JS and no bootstrap";
    			t3 = space();
    			create_component(componentwrapper.$$.fragment);
    			attr_dev(h2, "class", "svelte-1nvridf");
    			add_location(h2, file$3, 6, 2, 197);
    			attr_dev(p, "class", "svelte-1nvridf");
    			add_location(p, file$3, 7, 2, 218);
    			attr_dev(div, "id", "navbar-section");
    			attr_dev(div, "class", "page-section svelte-1nvridf");
    			add_location(div, file$3, 5, 0, 148);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(div, t3);
    			mount_component(componentwrapper, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const componentwrapper_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				componentwrapper_changes.$$scope = { dirty, ctx };
    			}

    			componentwrapper.$set(componentwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(componentwrapper);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionNavbar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionNavbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ComponentWrapper, NavbarVanilla });
    	return [];
    }

    class SectionNavbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionNavbar",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/sections/others/OtherSliderRange.svelte generated by Svelte v3.59.2 */

    const file$2 = "src/sections/others/OtherSliderRange.svelte";

    function create_fragment$2(ctx) {
    	let p;
    	let t1;
    	let div;
    	let input0;
    	let t2;
    	let input1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "A pure CSS slider with updating value";
    			t1 = space();
    			div = element("div");
    			input0 = element("input");
    			t2 = space();
    			input1 = element("input");
    			attr_dev(p, "class", "svelte-z03uz9");
    			add_location(p, file$2, 0, 0, 0);
    			attr_dev(input0, "class", "slider svelte-z03uz9");
    			attr_dev(input0, "type", "range");
    			input0.value = "70";
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", "100");
    			attr_dev(input0, "id", "range");
    			attr_dev(input0, "oninput", "rangenumber.value=value");
    			add_location(input0, file$2, 2, 2, 81);
    			attr_dev(input1, "class", "rangenumber svelte-z03uz9");
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "id", "rangenumber");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "100");
    			input1.value = "70";
    			attr_dev(input1, "oninput", "range.value=value");
    			add_location(input1, file$2, 3, 2, 194);
    			attr_dev(div, "class", "others-slider-range svelte-z03uz9");
    			add_location(div, file$2, 1, 0, 45);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, input0);
    			append_dev(div, t2);
    			append_dev(div, input1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OtherSliderRange', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OtherSliderRange> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class OtherSliderRange extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OtherSliderRange",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/sections/SectionOthers.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1 } = globals;
    const file$1 = "src/sections/SectionOthers.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (16:6) <ComponentWrapper type="others" comp={otherName}>
    function create_default_slot(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*otherName*/ ctx[3])];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$others*/ 1 && switch_value !== (switch_value = /*components*/ ctx[1][/*componizeString*/ ctx[2](/*otherName*/ ctx[3])])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:6) <ComponentWrapper type=\\\"others\\\" comp={otherName}>",
    		ctx
    	});

    	return block;
    }

    // (15:4) {#each Object.keys($others) as otherName}
    function create_each_block$1(ctx) {
    	let componentwrapper;
    	let current;

    	componentwrapper = new ComponentWrapper({
    			props: {
    				type: "others",
    				comp: /*otherName*/ ctx[3],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentwrapper.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentwrapper_changes = {};
    			if (dirty & /*$others*/ 1) componentwrapper_changes.comp = /*otherName*/ ctx[3];

    			if (dirty & /*$$scope, $others*/ 65) {
    				componentwrapper_changes.$$scope = { dirty, ctx };
    			}

    			componentwrapper.$set(componentwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(15:4) {#each Object.keys($others) as otherName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div0;
    	let current;
    	let each_value = Object.keys(/*$others*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "❐ Others";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Others to be used in grids";
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-dbahc0");
    			add_location(h2, file$1, 11, 2, 440);
    			attr_dev(p, "class", "svelte-dbahc0");
    			add_location(p, file$1, 12, 2, 460);
    			attr_dev(div0, "class", "others svelte-dbahc0");
    			add_location(div0, file$1, 13, 2, 496);
    			attr_dev(div1, "id", "others-section");
    			attr_dev(div1, "class", "page-section svelte-dbahc0");
    			add_location(div1, file$1, 10, 0, 391);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $others, components, componizeString*/ 7) {
    				each_value = Object.keys(/*$others*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $others;
    	validate_store(others, 'others');
    	component_subscribe($$self, others, $$value => $$invalidate(0, $others = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionOthers', slots, []);
    	const components = { OtherSliderRange };
    	const componizeString = name => `Other${name[0].toUpperCase()}${name.substring(1)}`;
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionOthers> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ComponentWrapper,
    		OtherDoubleRange: OtherSliderRange,
    		others,
    		OtherSliderRange,
    		components,
    		componizeString,
    		$others
    	});

    	return [$others, components, componizeString];
    }

    class SectionOthers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionOthers",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (21:2) {#each $sections.filter(sec => sec.code) as section}
    function create_each_block(ctx) {
    	let sectionsimple;
    	let current;
    	const sectionsimple_spread_levels = [/*section*/ ctx[1]];
    	let sectionsimple_props = {};

    	for (let i = 0; i < sectionsimple_spread_levels.length; i += 1) {
    		sectionsimple_props = assign(sectionsimple_props, sectionsimple_spread_levels[i]);
    	}

    	sectionsimple = new SectionSimple({
    			props: sectionsimple_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sectionsimple.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sectionsimple, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sectionsimple_changes = (dirty & /*$sections*/ 1)
    			? get_spread_update(sectionsimple_spread_levels, [get_spread_object(/*section*/ ctx[1])])
    			: {};

    			sectionsimple.$set(sectionsimple_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sectionsimple.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sectionsimple.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sectionsimple, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(21:2) {#each $sections.filter(sec => sec.code) as section}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let hero;
    	let t0;
    	let div1;
    	let sidebar;
    	let t1;
    	let div0;
    	let t2;
    	let sectioncards;
    	let t3;
    	let sectionitems;
    	let t4;
    	let sectionbuttons;
    	let t5;
    	let sectionnavbar;
    	let t6;
    	let sectionothers;
    	let current;

    	hero = new Hero({
    			props: { title, description },
    			$$inline: true
    		});

    	sidebar = new SideBar({
    			props: { sections: /*$sections*/ ctx[0].map(func) },
    			$$inline: true
    		});

    	let each_value = /*$sections*/ ctx[0].filter(func_1);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	sectioncards = new SectionCards({ $$inline: true });
    	sectionitems = new SectionItems({ $$inline: true });
    	sectionbuttons = new SectionButtons({ $$inline: true });
    	sectionnavbar = new SectionNavbar({ $$inline: true });
    	sectionothers = new SectionOthers({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(hero.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(sidebar.$$.fragment);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			create_component(sectioncards.$$.fragment);
    			t3 = space();
    			create_component(sectionitems.$$.fragment);
    			t4 = space();
    			create_component(sectionbuttons.$$.fragment);
    			t5 = space();
    			create_component(sectionnavbar.$$.fragment);
    			t6 = space();
    			create_component(sectionothers.$$.fragment);
    			attr_dev(div0, "class", "content-container svelte-1xin8v1");
    			add_location(div0, file, 19, 1, 755);
    			attr_dev(div1, "class", "page-container svelte-1xin8v1");
    			add_location(div1, file, 17, 0, 662);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(hero, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(sidebar, div1, null);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			append_dev(div0, t2);
    			mount_component(sectioncards, div0, null);
    			append_dev(div0, t3);
    			mount_component(sectionitems, div0, null);
    			append_dev(div0, t4);
    			mount_component(sectionbuttons, div0, null);
    			append_dev(div0, t5);
    			mount_component(sectionnavbar, div0, null);
    			append_dev(div0, t6);
    			mount_component(sectionothers, div0, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sidebar_changes = {};
    			if (dirty & /*$sections*/ 1) sidebar_changes.sections = /*$sections*/ ctx[0].map(func);
    			sidebar.$set(sidebar_changes);

    			if (dirty & /*$sections*/ 1) {
    				each_value = /*$sections*/ ctx[0].filter(func_1);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, t2);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(sidebar.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(sectioncards.$$.fragment, local);
    			transition_in(sectionitems.$$.fragment, local);
    			transition_in(sectionbuttons.$$.fragment, local);
    			transition_in(sectionnavbar.$$.fragment, local);
    			transition_in(sectionothers.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(sidebar.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(sectioncards.$$.fragment, local);
    			transition_out(sectionitems.$$.fragment, local);
    			transition_out(sectionbuttons.$$.fragment, local);
    			transition_out(sectionnavbar.$$.fragment, local);
    			transition_out(sectionothers.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(hero, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			destroy_component(sidebar);
    			destroy_each(each_blocks, detaching);
    			destroy_component(sectioncards);
    			destroy_component(sectionitems);
    			destroy_component(sectionbuttons);
    			destroy_component(sectionnavbar);
    			destroy_component(sectionothers);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const title = "Yann's UI Kit ❐";
    const description = "A repo of interesting non-bootstrap UI components ready to use.";
    const func = section => section.title;
    const func_1 = sec => sec.code;

    function instance($$self, $$props, $$invalidate) {
    	let $sections;
    	validate_store(sections, 'sections');
    	component_subscribe($$self, sections, $$value => $$invalidate(0, $sections = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		sections,
    		SideBar,
    		Hero,
    		SectionSimple,
    		SectionCards,
    		SectionItems,
    		SectionButtons,
    		SectionNavbar,
    		SectionOthers,
    		title,
    		description,
    		$sections
    	});

    	return [$sections];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
