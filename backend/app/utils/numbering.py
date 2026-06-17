def build_scope_block(items):

    lines = []

    for idx, item in enumerate(
            items,
            start=1
    ):
        lines.append(
            f"4.1.{idx} {item}"
        )

    return "\n".join(lines)

def build_scope_block(items):

    lines = []

    for idx, item in enumerate(
            items,
            start=1
    ):
        lines.append(
            f"5.1.{idx} {item}"
        )

    return "\n".join(lines)