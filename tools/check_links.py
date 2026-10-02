"""Checks every local link/src in the site's HTML files. Run: python3 tools/check_links.py"""
import re,os,sys
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));bad=0;ext=set()
for f in sorted(x for x in os.listdir(root) if x.endswith('.html')):
    for u in re.findall(r'(?:href|src)="([^"]+)"',open(os.path.join(root,f)).read()):
        if u.startswith('http'): ext.add(u);continue
        if u.startswith(('mailto:','tel:','#','data:')): continue
        p=u.split('#')[0].split('?')[0].lstrip('/') if u.startswith('/') else u.split('#')[0]
        if p and not os.path.exists(os.path.join(root,p)): print('BROKEN',f,'->',u);bad+=1
print('External links to test in a browser:',*sorted(ext),sep='\n  ');print('Broken local links:',bad);sys.exit(bad>0)
