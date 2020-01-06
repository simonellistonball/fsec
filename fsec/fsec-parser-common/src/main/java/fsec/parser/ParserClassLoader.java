package fsec.parser;

import java.net.URLClassLoader;

/**
 * Class loader to pull in custom parser units from external lib directories as required
 *
 * This should likely be replaced by something a bit NAR like
 *
 */
class ParserClassLoader extends ClassLoader {
    public ParserClassLoader(java.lang.ClassLoader parent) {
        super(parent);
    }
}
