from __future__ import annotations

from pathlib import Path
from xml.etree import ElementTree as ET

NOINDEX_PAGE_URLS = {
    "academic-disclaimer/",
    "privacy-notice/",
    "copyright/",
}


def on_page_context(context, page, config, nav):
    meta = dict(getattr(page, "meta", {}) or {})

    if page.url in NOINDEX_PAGE_URLS:
        meta["robots"] = "noindex, follow"

    context["seo_meta"] = meta
    return context


def on_post_build(config):
    sitemap_path = Path(config.site_dir) / "sitemap.xml"
    if not sitemap_path.exists():
        return

    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    excluded_urls = {
        f"{config.site_url.rstrip('/')}/{page_url}" for page_url in NOINDEX_PAGE_URLS
    }

    for url_node in list(root.findall("sm:url", namespace)):
        loc_node = url_node.find("sm:loc", namespace)
        if loc_node is not None and loc_node.text in excluded_urls:
            root.remove(url_node)

    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)
